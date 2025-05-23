# Components Documentation

## Page Components

### `AboutClientPage`

**Location**: `app/about/AboutClientPage.tsx`

Client component that renders the About page content with a tabbed interface.

**Features**:

- Hero section with profile summary and image
- Quick stats with animation
- Tabbed sections:
  - Professional background
  - Technical skills
  - Education
  - Personal interests
- Responsive design
- Animated transitions

**Props**: None (uses internal state and data fetching)

**State**:

- `profile`: Profile data from content/profile.json
- `activeTab`: Currently selected tab

### `ExperiencePageClient`

**Location**: `app/experience/ExperiencePageClient.tsx`

Client component that renders the Experience page with a timeline view.

**Features**:

- Interactive timeline of work experience
- Animated entries
- Responsive design
- Detailed role descriptions

## Utility Components

### `OptimizedImage`

**Location**: `components/optimized-image.tsx`

A wrapper around Next.js Image component with optimized loading.

**Props**:

- `src`: Image source
- `alt`: Alt text
- `width`: Image width
- `height`: Image height
- `priority`: Loading priority
- `className`: Additional CSS classes

### `ThemeProvider`

**Location**: `components/theme-provider.tsx`

Provides theme context and switching functionality.

**Features**:

- Dark/light mode support
- Theme persistence
- System theme detection

## Layout Components

### `Header`

**Location**: `components/header.tsx`

Main navigation header with responsive design.

**Features**:

- Responsive navigation
- Theme toggle
- Mobile menu

### `Footer`

**Location**: `components/footer.tsx`

Site footer with links and social media.

## Form Components

### `ContactForm`

**Location**: `components/contact-form.tsx`

Enhanced contact form with validation, security measures, and email notifications through Brevo API.

**Features**:

- Real-time form validation
- CSRF protection
- Honeypot field for spam prevention
- Rate limiting (5 attempts per hour)
- Email notifications using Brevo
- Auto-response emails
- Accessibility features
- Loading states and error handling
- Animated feedback
- Mobile responsive design

**Security Features**:

- CSRF token validation
- Form timestamp validation
- Honeypot field for bot detection
- IP-based rate limiting
- Server-side validation

**State**:

- `formState`: Form submission state and errors
- `isSubmitting`: Loading state indicator

**Environment Variables Required**:

- `BREVO_API_KEY`: API key for Brevo email service
- `CONTACT_EMAIL`: Recipient email for form submissions

- Form validation
- Error handling
- Success feedback
- CSRF protection

## UI Components

### Common UI Components

Located in `components/ui/`:

- `Button`: Customizable button component
- `Card`: Card container component
- `Badge`: Badge/tag component
- `Input`: Form input component
- `Textarea`: Multiline text input
- Many more from shadcn/ui library

## Hooks

### `useMobile`

**Location**: `hooks/use-mobile.tsx`

Custom hook for detecting mobile viewport.

**Returns**:

- `isMobile`: Boolean indicating mobile viewport

### `useToast`

**Location**: `hooks/use-toast.ts`

Custom hook for showing toast notifications.

**Methods**:

- `toast()`: Show a toast notification
- `dismiss()`: Dismiss active toast

## Content Management

### Content Utilities

**Location**: `lib/content.ts`

Functions for fetching and managing content:

- `getProfile()`: Fetch profile data
- `getEducation()`: Fetch education history
- `getExperiences()`: Fetch work experience
- `getCourses()`: Fetch course data
- `getProjects()`: Fetch project data

### Types

**Location**: `lib/types.ts`

TypeScript interfaces for data structures:

- `Profile`
- `Experience`
- `Education`
- `Course`
- `Project`
- `Skill`

## Styling

### Global Styles

**Location**: `app/globals.css`

Global styles and Tailwind CSS utilities.

### Theme Configuration

**Location**: `tailwind.config.ts`

Tailwind CSS configuration including:

- Custom colors
- Typography
- Animations
- Dark mode
