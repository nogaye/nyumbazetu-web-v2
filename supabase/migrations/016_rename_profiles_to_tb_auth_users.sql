-- Migration: Rename public.profiles to public.tb_auth_users (for DBs that already ran 015 with old name)
-- Run only if public.profiles exists. Safe to run on fresh DBs (no-op if profiles does not exist).

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'profiles'
  ) THEN
    ALTER TABLE public.profiles RENAME TO tb_auth_users;

    -- Update trigger function to reference new table name
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

    -- Rename updated_at trigger and function for consistency
    DROP TRIGGER IF EXISTS profiles_updated_at ON public.tb_auth_users;
    CREATE OR REPLACE FUNCTION public.set_tb_auth_users_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER tb_auth_users_updated_at
      BEFORE UPDATE ON public.tb_auth_users
      FOR EACH ROW
      EXECUTE FUNCTION public.set_tb_auth_users_updated_at();
    DROP FUNCTION IF EXISTS public.set_profiles_updated_at();

    -- Add table/column comments (same as in 015)
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
  END IF;
END;
$$;
