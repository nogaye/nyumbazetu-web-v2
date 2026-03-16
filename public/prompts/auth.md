You are a senior full-stack engineer. Build a production-grade authentication system for this app using Supabase, and use Supabase MCP wherever possible for project-aware setup, inspection, SQL/migration generation, and verification.

Important context and constraints:
- Use Supabase Auth as the authentication provider.
- Support email/password authentication.
- Support Google OAuth login.
- Build this as a complete, enterprise-ready auth foundation, not a demo.
- Prefer secure defaults and clean architecture.
- Use Supabase MCP to inspect the project, generate or apply schema changes, validate config assumptions, and help wire the implementation correctly.
- Do not hardcode secrets anywhere.
- Put all env variables in proper env files and document them.
- If some project details are missing, infer sensible defaults and proceed.

Objectives:
1. Create a full auth system with:
   - Sign up
   - Sign in
   - Sign out
   - Forgot password
   - Reset password
   - Email verification flow
   - Protected routes / guarded pages
   - Session persistence
   - Auth state listener
   - Google sign-in
   - Basic user profile bootstrap after first login
2. Make it production-grade with:
   - Clear folder structure
   - Reusable auth service / hooks / utilities
   - Typed models
   - Error handling
   - Loading states
   - Friendly user messages
   - Security best practices
3. Use Supabase-backed profile data:
   - Create a public profiles table linked 1:1 with auth.users
   - Auto-create a profile row on first user creation/login
   - Store fields like:
     - id (uuid, FK to auth.users.id)
     - email
     - full_name
     - avatar_url
     - auth_provider
     - created_at
     - updated_at
4. Add Row Level Security:
   - A user can read and update only their own profile
   - No user can access another user’s profile
5. Ensure Google auth is implemented correctly:
   - Proper Supabase OAuth flow
   - Redirect handling
   - Callback handling if needed by framework
   - Correct session exchange and route handling
6. Document exactly what needs to be configured in:
   - Supabase dashboard
   - Google Cloud Console
   - Redirect URLs
   - Environment variables

Execution requirements:
- First inspect the existing codebase and determine the framework, routing model, and best integration points.
- Then create an implementation plan.
- Then implement.
- After implementation, provide a concise setup guide and testing checklist.
- Prefer minimal but high-quality UI for auth screens if screens do not already exist.
- Reuse existing design system/components where available.

Technical requirements:
- Use the official Supabase client libraries appropriate for this project.
- Use secure session handling appropriate to the detected framework.
- Centralize auth logic into clean modules.
- Create middleware/guards for protected routes.
- Add a small auth context/store/composable/hook depending on framework conventions.
- Ensure refresh/reload does not log users out unexpectedly.
- Add logout handling that properly clears client state.
- Handle edge cases:
  - unverified email
  - OAuth account already exists
  - duplicate email on signup
  - expired reset link
  - missing callback session
  - auth/network failures

Database and backend requirements:
- Use Supabase MCP to inspect existing schema before creating anything.
- If the profiles table does not exist, create it with proper constraints.
- Add trigger/function or safe bootstrap logic so profile records are created reliably.
- Add SQL migration files if this repo uses migrations.
- Add RLS policies and explain them in comments.
- Add updated_at trigger if appropriate.

UI requirements:
Create or wire these pages/components if missing:
- Sign In page
- Sign Up page
- Forgot Password page
- Reset Password page
- Auth callback handler page/route if needed
- Simple account/profile page
- Protected example dashboard/page

Each page should have:
- good layout
- validation
- loading states
- inline error states
- Google sign-in button
- links between sign in / sign up / forgot password flows

Validation and security:
- Validate email format
- Validate password strength with a reasonable minimum
- Never expose service role keys client-side
- Use anon key only in client code
- Put server-only logic in server-safe locations
- Sanitize redirects
- Avoid insecure localStorage-only patterns if the framework has a better option
- Add comments where security decisions matter

Expected deliverables:
1. Fully implemented auth code
2. Any SQL/migration files needed
3. Env variable template updates
4. README/setup documentation
5. Short testing checklist
6. Summary of files created/updated
7. Notes on any assumptions made

Implementation notes:
- If this is Next.js, use the current recommended Supabase SSR/session approach for Next.js.
- If this is React SPA, implement clean client-side auth state management and protected routing.
- If this is Angular, create an AuthService, route guards, interceptors if needed, and proper Supabase integration.
- If this is another framework, follow its best-practice auth architecture.
- Detect the stack automatically and implement accordingly.

Supabase-specific requirements:
- Use Supabase Auth because it supports email/password, magic links/OTP, social login, and related auth workflows.
- Implement Google login through Supabase’s social login flow.
- Use Supabase MCP during build to inspect schema/config and help generate the correct setup.
- Be aware that Supabase documentation distinguishes between using MCP to connect AI tools to Supabase and using Supabase Auth for end-user authentication, so use MCP as the project integration/tooling layer and Supabase Auth as the actual user auth layer.

Definition of done:
- A user can sign up with email/password
- A user can log in with email/password
- A user can log in with Google
- Protected pages require authentication
- Password reset works
- Profile record exists and is secure
- RLS is enabled and correct
- Setup is documented
- Code is clean, typed, and production-ready

Now start by:
1. Detecting the framework and current auth state
2. Inspecting the Supabase setup with MCP
3. Producing a short plan
4. Implementing the full solution
5. Ending with setup steps, redirect URLs needed, and a test checklist