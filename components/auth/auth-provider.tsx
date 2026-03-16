"use client";

/**
 * Auth provider: exposes Supabase auth state and profile to the app.
 *
 * Listens to onAuthStateChange so sign-in/sign-out and token refresh are reflected
 * without full reload. Use useAuth() in Client Components for user, profile, and loading.
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAuthBrowserClient } from "@/lib/supabase/auth-client";
import { getCurrentProfile } from "@/lib/auth/supabase-auth-service";
import type { AuthProfile } from "@/lib/auth/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthState {
  user: SupabaseUser | null;
  profile: AuthProfile | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  refresh: () => Promise<void>;
  setError: (msg: string | null) => void;
}

const defaultState: AuthState = {
  user: null,
  profile: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadUserAndProfile() {
  const supabase = getAuthBrowserClient();
  if (!supabase) {
    return { user: null, profile: null };
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { user: null, profile: null };
  }
  const profile = await getCurrentProfile(supabase);
  return { user, profile };
}

/**
 * Provider that keeps auth state in sync with Supabase. Wrap the app (or auth-using subtree) with this.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultState);

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { user, profile } = await loadUserAndProfile();
      setState({ user, profile, loading: false, error: null });
    } catch (e) {
      setState({
        user: null,
        profile: null,
        loading: false,
        error: e instanceof Error ? e.message : "Failed to load session",
      });
    }
  }, []);

  useEffect(() => {
    const supabase = getAuthBrowserClient();
    if (!supabase) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    refresh();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await refresh();
      } else if (event === "SIGNED_OUT") {
        setState({ user: null, profile: null, loading: false, error: null });
      }
    });

    return () => subscription.unsubscribe();
  }, [refresh]);

  const setError = useCallback((msg: string | null) => {
    setState((s) => ({ ...s, error: msg }));
  }, []);

  const value: AuthContextValue = {
    ...state,
    refresh,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth state and refresh. Use in Client Components only.
 * Returns loading true until the first session check completes.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
