-- Migration: Create public.tb_auth_users table and RLS for Supabase Auth
-- Description: Application user profile table 1:1 with auth.users. Stores display and
--              provider data for the app; auto-created on sign-up/sign-in via trigger.
-- Run after Supabase Auth is enabled. Requires auth.users to exist.

-- =============================================================================
-- TB_AUTH_USERS TABLE
-- =============================================================================
-- This table holds app-level user profile data for every authenticated user.
-- Each row is 1:1 with auth.users: id is the same UUID as auth.users.id.
-- Used by the app to show display name, avatar, and auth provider without
-- querying auth schema. A row is created automatically when a user signs up
-- (trigger on auth.users) or on first sign-in (application upsert). RLS
-- ensures users can only read and update their own row.
CREATE TABLE IF NOT EXISTS public.tb_auth_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  auth_provider TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.tb_auth_users IS
  'Application user profiles: one row per Supabase Auth user (auth.users.id). '
  'Stores display name, email, avatar URL, and auth provider (e.g. email, google). '
  'Created automatically on sign-up via trigger or on first sign-in via app upsert. '
  'RLS restricts access to the current user''s row only. Used for account page and any '
  'UI that needs user identity without touching auth schema.';

COMMENT ON COLUMN public.tb_auth_users.id IS 'Same as auth.users.id; primary key and FK to auth.users.';
COMMENT ON COLUMN public.tb_auth_users.email IS 'User email; synced from auth at sign-up/sign-in.';
COMMENT ON COLUMN public.tb_auth_users.full_name IS 'Display name; from auth user_metadata or OAuth provider.';
COMMENT ON COLUMN public.tb_auth_users.avatar_url IS 'Profile image URL; from OAuth or user_metadata.';
COMMENT ON COLUMN public.tb_auth_users.auth_provider IS 'Provider that created the account: email, google, etc.';
COMMENT ON COLUMN public.tb_auth_users.created_at IS 'When the profile row was first created.';
COMMENT ON COLUMN public.tb_auth_users.updated_at IS 'Last update time; maintained by trigger.';

CREATE INDEX IF NOT EXISTS idx_tb_auth_users_email ON public.tb_auth_users(email);
CREATE INDEX IF NOT EXISTS idx_tb_auth_users_auth_provider ON public.tb_auth_users(auth_provider);

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION public.set_tb_auth_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tb_auth_users_updated_at ON public.tb_auth_users;
CREATE TRIGGER tb_auth_users_updated_at
  BEFORE UPDATE ON public.tb_auth_users
  FOR EACH ROW
  EXECUTE FUNCTION public.set_tb_auth_users_updated_at();

-- =============================================================================
-- AUTO-CREATE ROW ON AUTH USER INSERT (sign-up)
-- =============================================================================
-- When a new row is inserted into auth.users, create a matching tb_auth_users row.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  provider TEXT;
  usr_email TEXT;
  usr_name TEXT;
  usr_avatar TEXT;
BEGIN
  provider := COALESCE(NEW.raw_app_meta_data->>'provider', 'email');
  usr_email := NEW.email;
  usr_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '');
  usr_avatar := NEW.raw_user_meta_data->>'avatar_url';

  INSERT INTO public.tb_auth_users (id, email, full_name, avatar_url, auth_provider)
  VALUES (NEW.id, usr_email, usr_name, usr_avatar, provider)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.tb_auth_users.full_name, EXCLUDED.full_name),
    avatar_url = COALESCE(public.tb_auth_users.avatar_url, EXCLUDED.avatar_url),
    auth_provider = EXCLUDED.auth_provider,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE public.tb_auth_users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read only their own profile (id = auth.uid()).
CREATE POLICY "Users can read own profile"
  ON public.tb_auth_users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update only their own profile.
CREATE POLICY "Users can update own profile"
  ON public.tb_auth_users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Insert allowed when the row id matches the current user (e.g. OAuth first-time or trigger).
CREATE POLICY "Users can insert own profile"
  ON public.tb_auth_users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- No DELETE policy: users cannot delete their profile via RLS; admin/service can if needed.
