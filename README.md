# The Auld Dub - Irish Pub Website

Stockholm's most authentic Irish pub offering traditional Irish food, craft beers, live music and sports viewing.

## 🚀 Features

- **Interactive Google Maps** - Shows exact pub location with custom styling
- **Event Management** - Admin panel for managing sports matches and live music events  
- **Menu Management** - Upload and manage PDF menus with Supabase storage
- **Contact Forms** - EmailJS integration for contact inquiries
- **Responsive Design** - Optimized for all devices
- **SEO Optimized** - Meta tags, sitemap, and search engine optimization

## 🛠️ Technologies

- **React 18** with TypeScript
- **Supabase** for backend and database
- **Google Maps API** for interactive location map
- **EmailJS** for contact form functionality
- **GSAP & Framer Motion** for animations
- **React Helmet Async** for SEO management

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd Irish-Pub
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps API
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# EmailJS Configuration  
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Maps JavaScript API**
4. Create an API key in **Credentials**
5. Add your domain to **API key restrictions**
6. Add the API key to your `.env.local` file

**Important**: Restrict your API key to prevent unauthorized usage!

### 4. Supabase Setup

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get your project URL and anon key from Settings > API
4. Run the SQL schema (contact developer for schema file)
5. Create storage bucket named `menus`
6. Set up authentication and RLS policies

### 5. EmailJS Setup

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Create email service and template
3. Get service ID, template ID, and public key
4. Add to your environment variables

## 🚦 Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📱 Features Overview

### Admin Panel (`/admin`)
- Sports matches management
- Live music events management  
- PDF menu uploads and management
- Authentication with Supabase Auth

### Public Pages
- **Home** - Hero section with navigation
- **Menu** - Interactive PDF menu viewer
- **Entertainment** - Sports matches and live music
- **Contact** - Contact form and Google Maps location
- **All Matches** - Complete sports schedule
- **All Live Music** - Complete music events

## 🗺️ Google Maps Integration

The site includes an interactive Google Maps component that:
- Shows the exact location of The Auld Dub
- Features custom styling matching the site design
- Includes a marker with pub information
- Falls back gracefully when API key is not configured

## 🔒 Security Notes

- API keys are properly restricted in production
- RLS (Row Level Security) enabled in Supabase
- Admin authentication required for content management
- Environment variables for sensitive data

## 🚀 Deployment

The site is optimized for deployment on:
- **Netlify** (recommended)
- **Vercel** 
- **Static hosting services**

Make sure to add your environment variables to your hosting platform!

## 📞 Support

For technical support or questions about setup, please contact the development team.
