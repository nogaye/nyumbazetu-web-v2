# Supabase Auth Setup Guide

This app uses **Supabase Auth** for sign-up, sign-in (email/password and Google OAuth), password reset, and session management. Profile data is stored in a `public.tb_auth_users` table with Row Level Security (RLS).

## 1. Environment Variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (Dashboard → Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key (Dashboard → Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Service role key for admin/scripts; never use in client code |
| `NEXT_PUBLIC_APP_URL` | Optional | Full app URL for redirects (e.g. `https://your-domain.com`). If unset, redirects use request origin or `VERCEL_URL`. |

Never commit `.env.local` or expose the service role key in the browser.

## 2. Supabase Dashboard

### 2.1 Enable Auth providers

1. In [Supabase Dashboard](https://app.supabase.com) → **Authentication** → **Providers**:
   - **Email**: Enable if you use email/password. Configure “Confirm email” if you want verification before first sign-in.
   - **Google**: Enable and add Client ID and Client Secret from Google Cloud Console (see below).

### 2.2 Redirect URLs (Site URL and Redirect URLs)

1. **Authentication** → **URL Configuration**:
   - **Site URL**: Your production app URL (e.g. `https://your-domain.com`). For local dev use `http://localhost:3000`.
   - **Redirect URLs**: Add every URL where Supabase may redirect after sign-in or password reset. For example:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/**`
     - `https://your-domain.com/auth/callback`
     - `https://your-domain.com/**`

Without these, OAuth and magic-link redirects can be rejected.

### 2.3 Email templates (optional)

Under **Authentication** → **Email Templates** you can customize:

- Confirm signup
- Reset password
- Magic link

Use `{{ .ConfirmationURL }}` or `{{ .ConfirmationURL }}` in templates as documented by Supabase.

## 3. Google OAuth (Google Cloud Console)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Create or select a project → **Create Credentials** → **OAuth client ID**.
3. Application type: **Web application**.
4. **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://your-domain.com`
5. **Authorized redirect URIs** (must match Supabase’s callback URL):
   - `https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/auth/v1/callback`
   - Find your project ref in Supabase Dashboard → Settings → API → Project URL (e.g. `https://xxxxx.supabase.co` → ref is `xxxxx`).
6. Copy **Client ID** and **Client Secret** into Supabase Dashboard → Authentication → Providers → Google.

## 4. Database: tb_auth_users and RLS

Run the migration that creates `public.tb_auth_users` and RLS:

- Migration file: `supabase/migrations/015_profiles_and_auth_rls.sql`

If you use Supabase CLI:

```bash
supabase db push
```

Or run the SQL in the Supabase SQL Editor. The migration:

- Creates `public.tb_auth_users` (id, email, full_name, avatar_url, auth_provider, created_at, updated_at) with `id` FK to `auth.users(id)`. This table holds one row per Supabase Auth user for app display (name, avatar, provider) and is described in detail in the migration comments.
- Adds a trigger on `auth.users` to insert/upsert a row on sign-up.
- Enables RLS so users can only SELECT and UPDATE their own row (where `auth.uid() = id`).

## 5. Redirect URLs Summary

| Purpose | URL to add |
|--------|------------|
| OAuth / magic link callback | `https://your-domain.com/auth/callback` (and `http://localhost:3000/auth/callback` for dev) |
| Password reset page | `https://your-domain.com/auth/reset-password` (and localhost variant) |

Add these in:

- Supabase: **Authentication** → **URL Configuration** → **Redirect URLs**
- Google (if using Google): **Authorized redirect URIs** = Supabase callback only (see above).

## 6. App Routes

| Route | Description |
|-------|-------------|
| `/auth/sign-in` | Sign in (email/password + Google) |
| `/auth/sign-up` | Sign up (email/password + Google) |
| `/auth/forgot-password` | Request password reset email |
| `/auth/reset-password` | Set new password (from email link) |
| `/auth/callback` | OAuth/magic-link callback; exchanges code for session and redirects |
| `/account` | Protected account/profile page |
| `/dashboard` | Example protected page |

Protected routes use the `AuthGuard` component and redirect unauthenticated users to `/auth/sign-in?redirect=<intended-path>`.

## 7. Testing Checklist

- [ ] **Email sign-up**: Create account → confirm email (if enabled) → sign in.
- [ ] **Email sign-in**: Sign in with email/password → redirect to `/account` or `redirect` param.
- [ ] **Google sign-in**: Click “Continue with Google” → redirect to Google → back to `/auth/callback` → redirect to `/account`.
- [ ] **Forgot password**: Submit email → receive reset email → open link → set new password on `/auth/reset-password`.
- [ ] **Protected routes**: While signed out, open `/account` or `/dashboard` → redirect to sign-in with `redirect` set.
- [ ] **Session persistence**: Sign in → refresh page → still signed in.
- [ ] **Sign out**: Sign out → session cleared → protected routes redirect to sign-in.
- [ ] **Profile**: After first sign-in, `public.tb_auth_users` has a row for the user; RLS allows only own row.

## 8. Security Notes

- Only the **anon key** is used in client-side code; the **service role key** is for server/scripts only.
- RLS ensures users can read/update only their own profile.
- Redirect URLs are validated; avoid open redirects (see `sanitizeRedirect` in `lib/auth/types.ts`).
- Password strength: minimum length enforced in app (see `lib/auth/constants.ts`).

## 9. Troubleshooting

- **“Authentication is not configured”**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local`.
- **Google redirect fails**: Confirm the redirect URI in Google Console is exactly `https://<project-ref>.supabase.co/auth/v1/callback` and that the callback URL is listed in Supabase Redirect URLs.
- **Session lost on refresh**: Ensure the proxy runs on the routes that need auth (see `proxy.ts` config matcher) and that cookies are not blocked.
- **Profile missing**: Run migration `015_profiles_and_auth_rls.sql`; the trigger creates rows in `tb_auth_users` on sign-up. Existing users may need a one-time backfill or can get a row on next sign-in via `ensureProfile`.
