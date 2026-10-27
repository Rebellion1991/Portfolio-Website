# 👤 Ahmed Shenawy — Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7.svg?logo=netlify)](https://www.netlify.com/)

**A modern, responsive portfolio showcasing professional experience, technical skills and education in telecommunications and blockchain technology.**

## ✨ Features

- 🌓 Dark/light theme with system-preference detection
- 📱 Responsive, mobile-first layout
- ⚡ Performance-optimised — static generation, image optimisation, code splitting
- ♿ WCAG-aligned accessibility (ARIA attributes, keyboard navigation, screen-reader support)
- 🔍 SEO-complete — meta tags, Open Graph, Twitter cards, JSON-LD structured data
- 📝 JSON-based content — update experience, education and projects without touching code
- 📊 Privacy-focused Google Analytics integration
- ✉️ Contact form with validation, sent via Brevo

## 🏗️ Project Structure

```
app/                  # Next.js app directory with routes
├── about/
├── contact/
├── courses/
├── education/
├── experience/
├── not-found.tsx
├── layout.tsx
└── page.tsx
components/
├── ui/                           # Shadcn UI components
├── analytics.tsx                 # Google Analytics integration
├── contact-form.tsx              # Contact form with validation
├── theme-provider.tsx            # Dark/light theme management
└── accessibility-announcer.tsx   # Screen reader announcements
content/                          # JSON content files
├── courses.json, education.json, experiences.json, profile.json, projects.json
lib/
├── brevo.ts, content.ts, types.ts, validations/
public/
```

### Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide
- **Email**: Brevo API
- **Analytics**: Google Analytics 4
- **Deployment**: Netlify

## 📦 Installation

```bash
git clone https://github.com/Rebellion1991/Portfolio-Website.git
cd Portfolio-Website

pnpm install
```

### Environment Variables

Create `.env.local`:

```bash
BREVO_API_KEY=your_brevo_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your_google_analytics_id   # optional
```

### Run

```bash
pnpm dev
```

## 📄 License

No LICENSE file is present in this repository — treat it as all-rights-reserved unless you add one.
