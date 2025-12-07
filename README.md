# Nyumba Zetu - Property Listings Platform

A modern, production-ready property listings platform built with Next.js, Supabase, and Tailwind CSS. Features a clean, premium UI for browsing and managing property listings in Kenya.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### For Users
- 🏠 **Browse Properties** - Beautiful grid layout with responsive design
- 🔍 **Advanced Search** - Search by title, description, location
- 🎯 **Smart Filters** - Filter by city, area, price, bedrooms, property type, TPS
- 📊 **Sorting** - Sort by recommended, price, date
- 🖼️ **Image Gallery** - High-quality images with fullscreen mode and keyboard navigation
- 📝 **Contact Forms** - Easy-to-use contact forms for property inquiries
- 📱 **Mobile Optimized** - Fully responsive, works on all devices
- 🌙 **Dark Mode** - Beautiful dark mode support

### For Admins
- 📋 **Inquiry Management** - View and manage all property inquiries
- 🔄 **Status Tracking** - Track inquiry status (new, contacted, viewing_scheduled, closed)
- 📊 **Filtering** - Filter inquiries by status, property, date
- 📧 **Contact Info** - Quick access to inquirer contact information

### Technical Features
- ⚡ **Performance** - Optimized images, lazy loading, Edge runtime
- 🔒 **Type Safety** - Full TypeScript coverage
- 🛡️ **Security** - Row Level Security (RLS), input validation
- ♿ **Accessibility** - WCAG compliant, keyboard navigation
- 🧪 **Testing** - Comprehensive test suite
- 📚 **Documentation** - Extensive documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nyumbazetu-web-modern-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   
   Go to your Supabase Dashboard → SQL Editor and run these migrations in order:
   - `supabase/migrations/001_create_properties_tables.sql`
   - `supabase/migrations/002_setup_storage_policies.sql`
   - `supabase/migrations/003_create_property_inquiries_table.sql`

5. **Set up storage**
   
   Go to Supabase Dashboard → Storage:
   - Create a new bucket named `property-images`
   - Make it public
   - The storage policies are set up in migration 002

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nyumbazetu-web-modern-v2/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── property-inquiry/    # Inquiry endpoints
│   ├── admin/                   # Admin pages
│   │   └── inquiries/           # Inquiry management
│   ├── listings/                 # Listing pages
│   │   ├── page.tsx             # Listings list
│   │   └── [slug]/              # Listing detail
│   └── ...
├── components/                   # React components
│   ├── admin/                   # Admin components
│   ├── listings/                # Listing components
│   └── ui/                      # UI primitives
├── lib/                         # Utilities and helpers
│   ├── listings/                # Listing-related utilities
│   ├── supabase/                # Supabase clients
│   └── ...
├── supabase/                    # Database migrations
│   └── migrations/              # SQL migration files
├── scripts/                     # Utility scripts
│   └── test-property-inquiry.js # API test script
└── public/                      # Static assets
```

## 🧪 Testing

### Run API Tests

```bash
# Make sure your dev server is running first
npm run dev

# In another terminal, run tests
node scripts/test-property-inquiry.js
```

### Test Against Different Environment

```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com node scripts/test-property-inquiry.js
```

## 📚 Documentation

- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Complete project status and overview
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Detailed setup guide
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Supabase configuration
- **[CONTACT_FORM_INTEGRATION.md](./CONTACT_FORM_INTEGRATION.md)** - Contact form docs
- **[NEXT_STEPS_ADMIN.md](./NEXT_STEPS_ADMIN.md)** - Admin tools documentation

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
node scripts/test-property-inquiry.js  # Test API endpoints
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (if configured)
- Tailwind CSS for styling

## 🔒 Security

### Before Production

1. **Add Authentication**
   - Protect admin routes (`/admin/*`)
   - Add authentication to API routes
   - Use NextAuth, Clerk, or your auth provider

2. **Environment Variables**
   - Never commit `.env.local`
   - Use secure secrets management
   - Rotate keys regularly

3. **Rate Limiting**
   - Add rate limiting to API routes
   - Use services like Upstash Rate Limit

4. **Input Validation**
   - All inputs are validated
   - Consider adding reCAPTCHA to forms

5. **Monitoring**
   - Set up error tracking (Sentry, etc.)
   - Monitor API usage
   - Set up alerts

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional, for analytics)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional, for analytics)

## 📊 Analytics

Analytics tracking is built-in and supports:
- Google Analytics 4
- Plausible Analytics

Configure in `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain
```

## 🎨 Customization

### Colors

Primary color is `#b98036`. To change it:
1. Update `tailwind.config.ts`
2. Update CSS variables in `globals.css`

### Styling

The project uses Tailwind CSS. Customize:
- Colors in `tailwind.config.ts`
- Typography in component classes
- Spacing using Tailwind utilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

[Add your license here]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- All contributors and users

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🗺️ Roadmap

### Planned Features
- [ ] User authentication
- [ ] Save/favorite listings
- [ ] Map view of properties
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app (future)

### In Progress
- [x] Core listings functionality
- [x] Admin dashboard
- [x] Contact forms
- [x] Image optimization

---

**Built with ❤️ for the Kenyan property market**
