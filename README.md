# Ahmed Shenawy's Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/ui. This website showcases professional experience, technical skills, and educational background in telecommunications and blockchain technology.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui
- **Dark/Light Theme**: Automatic and manual theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with fluid layouts and optimized breakpoints
- **Performance Optimized**: Static generation, image optimization, and code splitting
- **Accessibility**: WCAG compliant with ARIA attributes, keyboard navigation, and screen reader support
- **SEO Friendly**: Complete meta tags, Open Graph, Twitter cards, and JSON-LD structured data
- **Content Management**: JSON-based content management for easy updates
- **Production Ready**: Optimized for Netlify deployment with proper error handling
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Analytics Ready**: Google Analytics integration with privacy-focused implementation

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Email Service**: [Brevo API](https://www.brevo.com/)
- **Analytics**: [Google Analytics 4](https://analytics.google.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 📁 Project Structure

```text
app/                  # Next.js app directory with routes
├── about/           # About page components
├── contact/         # Contact page with form functionality
├── courses/         # Courses and certifications page
├── education/       # Education timeline page
├── experience/      # Professional experience page
├── not-found.tsx    # Custom 404 error page
├── layout.tsx       # Root layout with theme provider
└── page.tsx         # Homepage component
components/          # Reusable React components
├── ui/             # Shadcn UI components
├── analytics.tsx   # Google Analytics integration
├── contact-form.tsx # Contact form with validation
├── theme-provider.tsx # Dark/light theme management
└── accessibility-announcer.tsx # Screen reader announcements
content/             # JSON content files
├── courses.json    # Course and certification data
├── education.json  # Educational background
├── experiences.json # Professional experience
├── profile.json    # Personal information and skills
└── projects.json   # Portfolio projects
lib/                # Utility functions and configurations
├── brevo.ts        # Email service integration
├── content.ts      # Content management utilities
├── types.ts        # TypeScript type definitions
└── validations/    # Form validation schemas
public/             # Static assets and images
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone [repository-url]
cd Portfolio-Website
```

1. **Install dependencies**

```bash
pnpm install
```

1. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
BREVO_API_KEY=your_brevo_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your_google_analytics_id (optional)
```

1. **Run the development server**

```bash
pnpm dev
```

1. **Build for production**

```bash
pnpm build
```

## 🔧 Configuration

- `components.json`: Shadcn/ui configuration
- `tailwind.config.ts`: Tailwind CSS configuration with custom theme
- `next.config.js`: Next.js configuration optimized for Netlify
- `tsconfig.json`: TypeScript configuration with strict settings
- `netlify.toml`: Netlify deployment configuration

## 📄 Content Management

Content is managed through JSON files in the `content/` directory:

- `profile.json`: Personal information and skills
- `experiences.json`: Work experience timeline
- `education.json`: Educational background
- `courses.json`: Certifications and courses
- `projects.json`: Portfolio projects

## 🎨 Theming

The website supports light and dark themes through Tailwind CSS and the `theme-provider` component. Theme preferences are stored in localStorage.

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## ♿ Accessibility

- ARIA labels, roles, and live regions for dynamic content
- Comprehensive keyboard navigation support
- Skip to content link for screen readers
- Screen reader announcements for page transitions
- Sufficient color contrast ratios (WCAG AA compliant)
- Focus management and visible focus indicators
- Semantic HTML structure with proper heading hierarchy

## 🔍 SEO

- Complete meta tags with Open Graph and Twitter Cards
- JSON-LD structured data for rich snippets
- Canonical URLs and proper URL structure
- Dynamic sitemap generation
- Optimized robots.txt
- Image alt texts and semantic markup

## 🧪 Best Practices

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Component Architecture**: Reusable, composable React components
- **Performance**: Image optimization, code splitting, and static generation
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive testing
- **SEO**: Complete meta tags, structured data, and semantic HTML
- **Security**: Content Security Policy and security headers
- **Error Handling**: Custom error pages and graceful error boundaries

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚀 Deployment

This project is optimized for deployment on Netlify with full static generation and edge function support.

### ✅ Pre-deployment Checklist

- [x] **Build Success**: All pages generate without errors
- [x] **Type Safety**: Zero TypeScript compilation errors
- [x] **ARIA Compliance**: All accessibility issues resolved
- [x] **Performance**: Optimized images and code splitting
- [x] **SEO**: Complete meta tags and structured data
- [x] **Error Handling**: Custom 404 page and error boundaries

### 🛠️ Netlify Setup

1. **Connect Repository**: Link your GitHub repository to Netlify
1. **Build Settings**:
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Node version: 18.x
1. **Plugin**: `@netlify/plugin-nextjs` (automatically detected)

### 🔐 Environment Variables

Configure these in your Netlify dashboard:

```bash
BREVO_API_KEY=your_brevo_api_key_here
NEXT_PUBLIC_BASE_URL=https://your-domain.netlify.app
NEXT_PUBLIC_GA_ID=your_google_analytics_id  # Optional
```

### 🚦 Deployment Process

**Automatic Deployments:**

- Production: Deploys automatically when pushing to `main` branch
- Preview: Creates preview deployments for pull requests

**Manual Deployment:**

```bash
# Build locally first
pnpm build

# Deploy using Netlify CLI
netlify deploy --prod
```

### 🔒 Security

Security headers are configured in `netlify.toml`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### 🐛 Troubleshooting

If deployment fails:

1. **Check Build Logs**: Review detailed logs in Netlify dashboard
1. **Verify Environment Variables**: Ensure all required vars are set
1. **Test Locally**: Run `pnpm build` to catch issues early
1. **Dependencies**: Clear cache and reinstall: `rm -rf node_modules .next && pnpm install`
1. **Function Logs**: Check Netlify Function logs for contact form issues

### 📊 Performance

Post-deployment optimization:

- **Lighthouse Score**: Aim for 90+ on all metrics
- **Core Web Vitals**: Monitor LCP, FID, and CLS
- **Analytics**: Track user engagement with Google Analytics
- **Error Monitoring**: Monitor build and runtime errors

## 🔧 Recent Improvements

### Deployment Optimization (May 2025)

- **✅ Prerender Error Fix**: Resolved `useSearchParams()` Suspense boundary issue
- **✅ Custom 404 Page**: Added proper error handling with `not-found.tsx`
- **✅ ARIA Compliance**: Fixed all dynamic ARIA attribute issues
- **✅ TypeScript Errors**: Resolved all compilation and type errors
- **✅ Inline Styles**: Optimized CSS with utility classes and custom properties
- **✅ Build Success**: Achieved 100% successful static page generation

### Key Fixes Applied

1. **Analytics Component**: Wrapped in Suspense boundary to prevent prerender errors
1. **ARIA Attributes**: Converted dynamic expressions to static values with useEffect updates
1. **Brevo Integration**: Fixed authentication method for email service
1. **Tailwind Configuration**: Added proper plugin imports and type assertions
1. **Contact Form**: Separated client/server components following Next.js 15 patterns

### Build Status

```bash
✓ Compiled successfully
✓ Collecting page data (10/10 pages)
✓ Generating static pages (10/10)
✓ Finalizing page optimization

Route (app)                    Size     First Load JS
┌ ○ /                         139 B    158 kB
├ ○ /about                    138 B    158 kB
├ ○ /contact                  6.49 kB  151 kB
├ ○ /courses                  5.89 kB  150 kB
├ ○ /education                9.98 kB  154 kB
└ ○ /experience               6.42 kB  151 kB

○ (Static) - prerendered as static content
```
