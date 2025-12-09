/**
 * Simple Authentication System
 * 
 * This is a basic authentication system using session cookies.
 * For production, consider using NextAuth.js or a more robust solution.
 * 
 * This implementation:
 * - Uses HTTP-only cookies for sessions
 * - Stores sessions in memory (for production, use Redis or database)
 * - Validates admin users against Supabase
 */

import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";
import crypto from "crypto";

const SESSION_SECRET = process.env.SUPABASE_SESSION_SECRET || "change-this-in-production";
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// In-memory session store (use Redis in production)
const sessions = new Map<string, { userId: string; email: string; role: string; expiresAt: number }>();

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
}

/**
 * Verify admin user credentials
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  if (!supabaseAdmin) {
    console.error("Supabase not configured");
    return null;
  }

  try {
    // Fetch admin user
    const { data, error } = await (supabaseAdmin
      .from("admin_users") as any)
      .select("id, email, name, role, password_hash, is_active")
      .eq("email", email.toLowerCase())
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return null;
    }

    // Verify password (using bcryptjs)
    let isValid = false;
    try {
      const bcrypt = require("bcryptjs");
      isValid = await bcrypt.compare(password, data.password_hash);
    } catch (err) {
      console.error("Error comparing password:", err);
      return null;
    }

    if (!isValid) {
      return null;
    }

    // Update last login
    await (supabaseAdmin.from("admin_users") as any)
      .update({ last_login: new Date().toISOString() })
      .eq("id", data.id);

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      is_active: data.is_active,
    };
  } catch (error) {
    console.error("Error verifying admin credentials:", error);
    return null;
  }
}

/**
 * Create a session for an admin user
 */
export async function createSession(user: AdminUser): Promise<string> {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_DURATION;

  sessions.set(sessionId, {
    userId: user.id,
    email: user.email,
    role: user.role,
    expiresAt,
  });

  return sessionId;
}

/**
 * Get session from cookie
 */
export async function getSession(): Promise<{
  userId: string;
  email: string;
  role: string;
} | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const session = sessions.get(sessionId);

  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return null;
  }

  return {
    userId: session.userId,
    email: session.email,
    role: session.role,
  };
}

/**
 * Destroy session
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionId) {
    sessions.delete(sessionId);
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}

/**
 * Set session cookie
 */
export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });
}

/**
 * Check if user is authenticated and is admin
 */
export async function requireAdmin(): Promise<{
  userId: string;
  email: string;
  role: string;
}> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

/**
 * Clean up expired sessions (call this periodically)
 */
export function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (session.expiresAt < now) {
      sessions.delete(sessionId);
    }
  }
}


