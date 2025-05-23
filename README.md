# Ahmed Shenawy's Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/ui. This website showcases professional experience, technical skills, and educational background in telecommunications and blockchain technology.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui
- **Dark/Light Theme**: Automatic and manual theme switching
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Performance Optimized**: Uses Next.js Image optimization and dynamic imports
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Friendly**: Meta tags, Open Graph, and JSON-LD structured data
- **Content Management**: JSON-based content management for easy updates

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## 📁 Project Structure

```
app/                  # Next.js app directory with routes
├── about/           # About page components
├── contact/         # Contact page components
├── courses/         # Courses page components
├── education/       # Education page components
├── experience/      # Experience page components
components/          # Reusable React components
├── ui/             # Shadcn UI components
content/             # JSON content files
├── courses.json    # Course data
├── education.json  # Education history
├── experiences.json # Work experience
├── profile.json    # Personal profile
lib/                # Utility functions and types
public/             # Static assets
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone [repository-url]
cd Portfolio-Website
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm dev
```

4. **Build for production**

```bash
pnpm build
```

## 🔧 Configuration

- `components.json`: Shadcn/ui configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `next.config.js`: Next.js configuration
- `tsconfig.json`: TypeScript configuration

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

- ARIA labels and roles
- Keyboard navigation
- Skip to content link
- Screen reader announcements
- Sufficient color contrast
- Focus management

## 🔍 SEO

- Meta tags
- Open Graph meta tags
- JSON-LD structured data
- Canonical URLs
- Sitemap generation
- Robots.txt

## 🧪 Best Practices

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture
- Responsive images
- Performance optimization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

This project is configured for deployment on Netlify.

### Netlify Setup

1. Connect your GitHub repository to Netlify
2. Configure the following build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Node version: 18.x

### Environment Variables

Set the following environment variables in Netlify's dashboard:

- `BREVO_API_KEY`: Your Brevo API key for email functionality
- `CONTACT_EMAIL`: Email address for receiving contact form submissions

### Automatic Deployments

The project is configured to automatically deploy:

- When pushing to the main branch
- When creating pull requests (preview deployments)

### Manual Deployment

To deploy manually:

```bash
# Build the project locally
pnpm build

# Use Netlify CLI (if installed)
netlify deploy
```

### Security Headers

Security headers are configured in `netlify.toml`:

- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### Troubleshooting

If you encounter issues:

1. Check build logs in Netlify dashboard
2. Verify environment variables are set correctly
3. Ensure dependencies are resolved: `pnpm install`
4. Check for build errors: `pnpm build`
5. Review Netlify Function logs if contact form fails
