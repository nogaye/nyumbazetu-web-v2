# Quick Start Guide

Get your Nyumba Zetu property listings platform up and running in minutes!

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Check Environment Variables
```bash
npm run check:env
```

This will tell you what's missing. If `.env.local` doesn't exist, create it:
```bash
cp .env.example .env.local
```

Then add your Supabase credentials from: https://supabase.com/dashboard/project/_/settings/api

### 3. Set Up Database

Go to Supabase Dashboard → SQL Editor and run these migrations **in order**:

1. `supabase/migrations/001_create_properties_tables.sql`
2. `supabase/migrations/002_setup_storage_policies.sql`
3. `supabase/migrations/003_create_property_inquiries_table.sql`

### 4. Set Up Storage

1. Go to Supabase Dashboard → Storage
2. Click "New bucket"
3. Name: `property-images`
4. Check "Public bucket"
5. Click "Create bucket"

### 5. Start Development Server
```bash
npm run dev
```

### 6. Test Everything
```bash
# In another terminal
npm run test:api
```

## 🎯 What You Get

- ✅ Listings page at `/listings`
- ✅ Admin dashboard at `/admin/inquiries`
- ✅ Contact forms working
- ✅ Image optimization
- ✅ Search and filters
- ✅ Responsive design

## 📚 Next Steps

1. **Add Properties**: Upload properties to Supabase or use the mock data
2. **Upload Images**: Add property images to the `property-images` bucket
3. **Test Forms**: Submit a contact form and check `/admin/inquiries`
4. **Customize**: Update colors, branding, and content

## 🆘 Troubleshooting

### "Supabase not configured"
- Run `npm run check:env` to verify environment variables
- Make sure `.env.local` exists and has correct values

### "Table doesn't exist"
- Run the database migrations in Supabase SQL Editor
- Check that migrations ran successfully

### "Images not loading"
- Verify storage bucket is created and public
- Check image paths in database
- Use mock data placeholders for testing

### "API tests failing"
- Make sure dev server is running (`npm run dev`)
- Check that environment variables are set
- Verify database migrations are complete

## 📖 Full Documentation

- **[README.md](./README.md)** - Complete project overview
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Feature status
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Detailed setup
- **[CONTACT_FORM_INTEGRATION.md](./CONTACT_FORM_INTEGRATION.md)** - Contact form docs

## 🚀 Ready to Deploy?

1. Build for production: `npm run build`
2. Test production build: `npm run start`
3. Deploy to Vercel, Netlify, or your platform
4. Set environment variables in your deployment platform

---

**Need help?** Check the documentation files or open an issue!

