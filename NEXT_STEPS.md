# Next Steps for Admin Dashboard

## ✅ Completed

1. **Admin Dashboard Structure**
   - ✅ Admin login page (`/admin/login`)
   - ✅ Admin properties management (`/admin/properties`)
   - ✅ Admin inquiries management (`/admin/inquiries`)
   - ✅ Authentication system with session cookies
   - ✅ Protected routes with middleware
   - ✅ Property form (Add/Edit) matching Contact form design

2. **Database Migrations**
   - ✅ Properties table (`001_create_properties_tables.sql`)
   - ✅ Storage policies (`002_setup_storage_policies.sql`)
   - ✅ Property inquiries table (`003_create_property_inquiries_table.sql`)

3. **API Endpoints**
   - ✅ Admin login/logout (`/api/auth/login`, `/api/auth/logout`)
   - ✅ Session check (`/api/auth/me`)
   - ✅ Property CRUD (`/api/admin/properties`)
   - ✅ Inquiries management (`/api/property-inquiry/admin`)

## 🔴 Critical: Setup Required

### 1. Create Admin Users Table Migration

**Action Required**: Create and run the migration for admin users.

Create `supabase/migrations/004_create_admin_users_table.sql`:

```sql
-- Migration: Create admin_users table
-- Created: 2024
-- Description: Stores admin user accounts for authentication

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- RLS Policies (optional - adjust based on your security needs)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access (admin operations should use service role)
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();
```

**Run the migration**:
- Via Supabase Dashboard: SQL Editor → Run the migration
- Via Supabase CLI: `supabase db push`

### 2. Create First Admin User

**Action Required**: Create your first admin user account.

You can do this via:

**Option A: SQL Script** (Run in Supabase SQL Editor):

```sql
-- Install pgcrypto extension if not already installed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create admin user (replace email and password)
INSERT INTO admin_users (email, password_hash, name, role, is_active)
VALUES (
  'admin@nyumbazetu.com',
  crypt('your-secure-password', gen_salt('bf')),
  'Admin User',
  'admin',
  true
);
```

**Option B: Create a Setup Script** (Recommended):

Create `scripts/create-admin-user.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = process.argv[2] || 'admin@nyumbazetu.com';
  const password = process.argv[3] || 'admin123';
  const name = process.argv[4] || 'Admin User';

  if (!email || !password) {
    console.error('Usage: node scripts/create-admin-user.js <email> <password> [name]');
    process.exit(1);
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert admin user
  const { data, error } = await supabase
    .from('admin_users')
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      name: name,
      role: 'admin',
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }

  console.log('✅ Admin user created successfully!');
  console.log('Email:', data.email);
  console.log('Name:', data.name);
  console.log('Role:', data.role);
  console.log('\n⚠️  Remember to change the default password!');
}

createAdminUser();
```

Then run:
```bash
node scripts/create-admin-user.js admin@nyumbazetu.com your-secure-password "Admin Name"
```

### 3. Environment Variables

**Action Required**: Ensure all required environment variables are set in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Session Secret (generate a secure random string)
SESSION_SECRET=your-secure-random-session-secret-here

# Email (optional, for notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

**Generate SESSION_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🟡 Recommended Next Steps

### 4. Test the Admin Dashboard

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to admin login**:
   - Go to `http://localhost:3000/admin/login`
   - Log in with your admin credentials

3. **Test functionality**:
   - ✅ Create a new property
   - ✅ Edit an existing property
   - ✅ Delete a property
   - ✅ View property inquiries
   - ✅ Update inquiry status

### 5. Email Notifications (Optional)

**Action**: Set up email notifications for property inquiries.

Create `lib/email/notifications.ts`:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyTitle: string;
}) {
  // Implementation
}
```

Then integrate into `app/api/property-inquiry/route.ts`.

### 6. Additional Admin Features (Future)

Based on the TODO items in `app/admin/layout.tsx`:

- [ ] **Users Management Page** (`/admin/users`)
  - List all admin users
  - Create/edit/delete admin users
  - Manage roles and permissions

- [ ] **Settings Page** (`/admin/settings`)
  - Site configuration
  - Email settings
  - General preferences

- [ ] **Analytics Dashboard**
  - Property views
  - Inquiry statistics
  - Conversion rates

- [ ] **Bulk Operations**
  - Bulk property import
  - Bulk status updates
  - Export to CSV/Excel

### 7. Production Considerations

**Before deploying to production**:

1. **Session Storage**:
   - Current: In-memory (lost on server restart)
   - Production: Use Redis or database-backed sessions
   - Update `lib/auth/simple-auth.ts` to use persistent storage

2. **Password Security**:
   - Enforce strong password requirements
   - Add password reset functionality
   - Consider 2FA for admin accounts

3. **Rate Limiting**:
   - Add rate limiting to login endpoint
   - Protect against brute force attacks

4. **Audit Logging**:
   - Log admin actions
   - Track property changes
   - Monitor inquiry status updates

5. **Backup Strategy**:
   - Regular database backups
   - Backup property images
   - Test restore procedures

## 📋 Quick Start Checklist

- [ ] Run migration `004_create_admin_users_table.sql`
- [ ] Create first admin user (via SQL or script)
- [ ] Set `SESSION_SECRET` in `.env.local`
- [ ] Test admin login at `/admin/login`
- [ ] Create a test property
- [ ] Test property inquiry form
- [ ] Verify inquiries appear in admin dashboard
- [ ] (Optional) Set up email notifications

## 🐛 Troubleshooting

**Issue**: Can't log in / 401 errors
- ✅ Check admin_users table exists
- ✅ Verify admin user is created and `is_active = true`
- ✅ Check password is correctly hashed
- ✅ Verify SESSION_SECRET is set

**Issue**: Properties/Inquiries pages are empty
- ✅ Check Supabase connection
- ✅ Verify tables exist and have data
- ✅ Check browser console for errors
- ✅ Verify API routes are working

**Issue**: Session lost on page refresh
- ✅ This is expected with in-memory sessions
- ✅ Re-login after server restart
- ✅ For production, implement persistent session storage

## 📚 Documentation

- Admin API: See `app/api/admin/` and `app/api/auth/`
- Components: See `components/admin/`
- Authentication: See `lib/auth/simple-auth.ts`
- Migrations: See `supabase/migrations/`

---

**Status**: ✅ Core functionality complete, setup required
**Last Updated**: Current date