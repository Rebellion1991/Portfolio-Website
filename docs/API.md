# API Documentation

## Content API

### Profile

**Endpoint**: `/content/profile.json`  
**Method**: GET  
**Returns**: Profile information

```typescript
interface Profile {
  name: string;
  title: string;
  summary: string;
  professionalBackground: string;
  location: string;
  email: string;
  website: string;
  socialLinks: {
    linkedin: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
}
```

### Experience

**Endpoint**: `/content/experiences.json`  
**Method**: GET  
**Returns**: Array of work experiences

```typescript
interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: string[];
}
```

### Education

**Endpoint**: `/content/education.json`  
**Method**: GET  
**Returns**: Array of education entries

```typescript
interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}
```

### Courses

**Endpoint**: `/content/courses.json`  
**Method**: GET  
**Returns**: Array of courses and certifications

```typescript
interface Course {
  title: string;
  provider: string;
  date: string;
  description: string;
  skills: string[];
  certificate?: string;
}
```

## Utility Functions

### Content Management

```typescript
// lib/content.ts

/**
 * Fetch profile data
 * @returns Promise<Profile>
 */
async function getProfile(): Promise<Profile>;

/**
 * Fetch education history
 * @returns Promise<Education[]>
 */
async function getEducation(): Promise<Education[]>;

/**
 * Fetch work experience
 * @returns Promise<Experience[]>
 */
async function getExperiences(): Promise<Experience[]>;

/**
 * Fetch courses and certifications
 * @returns Promise<Course[]>
 */
async function getCourses(): Promise<Course[]>;
```

### Theme Management

```typescript
// hooks/useTheme.ts

/**
 * Hook for theme management
 * @returns {Object} Theme controls
 */
function useTheme() {
  return {
    /** Current theme */
    theme: 'light' | 'dark',
    /** Toggle theme function */
    toggleTheme: () => void,
    /** Set specific theme */
    setTheme: (theme: 'light' | 'dark') => void
  };
}
```

### Mobile Detection

```typescript
// hooks/useMobile.ts

/**
 * Hook for detecting mobile viewport
 * @returns {boolean} Is mobile viewport
 */
function useMobile(): boolean;
```

## Component Props

### OptimizedImage

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}
```

### ExperienceCard

```typescript
interface ExperienceCardProps {
  experience: Experience;
  isLatest?: boolean;
}
```

### CourseCard

```typescript
interface CourseCardProps {
  course: Course;
}
```

### ContactForm

```typescript
interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: FormData;
}
```

## Data Schemas

### JSON Content Files

All JSON content files should follow these schemas:

```typescript
// profile.json
{
  "name": string,
  "title": string,
  "summary": string,
  "professionalBackground": string,
  "location": string,
  "email": string,
  "website": string,
  "socialLinks": {
    "linkedin": string
  },
  "skills": Array<{
    "category": string,
    "items": string[]
  }>
}

// experiences.json
Array<{
  "title": string,
  "company": string,
  "location": string,
  "startDate": string, // YYYY-MM format
  "endDate": string | null,
  "description": string,
  "highlights": string[],
  "technologies": string[]
}>

// education.json
Array<{
  "institution": string,
  "degree": string,
  "field": string,
  "startDate": string, // YYYY-MM format
  "endDate": string,
  "location": string,
  "description": string
}>

// courses.json
Array<{
  "title": string,
  "provider": string,
  "date": string, // YYYY-MM format
  "description": string,
  "skills": string[],
  "certificate"?: string
}>
```

## Error Handling

All API endpoints and utility functions should handle errors gracefully:

```typescript
interface ErrorResponse {
  error: {
    message: string;
    code: string;
    details?: any;
  };
}
```

Common error codes:

- `CONTENT_NOT_FOUND`: Content file not found
- `INVALID_JSON`: Invalid JSON format
- `SCHEMA_ERROR`: Data doesn't match schema
- `NETWORK_ERROR`: Network request failed

## Form Actions

### Contact Form Submission

**Action**: `/app/actions.ts`  
**Method**: Server Action  
**Function**: `submitContactForm`

```typescript
type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
};

async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState>;
```

**Features**:

- Form validation using Zod
- Rate limiting (5 attempts per hour)
- Email notifications via Brevo API
- Auto-response emails
- CSRF protection
- Spam prevention

**Required Environment Variables**:

- `BREVO_API_KEY`: API key for Brevo email service
- `CONTACT_EMAIL`: Recipient email for form submissions

### Email Service

**Module**: `/lib/brevo.ts`

```typescript
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

async function sendEmail(options: EmailOptions): Promise<void>;
```

### Rate Limiting

**Module**: `/lib/rate-limit.ts`

```typescript
interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

async function rateLimit(
  key: string,
  limit: number,
  window: number
): Promise<RateLimitResult>;
```

### Form Validation

**Module**: `/lib/validations/contact.ts`

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(2),
  website: z.string().max(0), // Honeypot
  formRenderedAt: z.string(),
  csrfToken: z.string().min(1),
});
```

**Validation Rules**:

- Name: Minimum 2 characters
- Email: Valid email format
- Subject: Minimum 5 characters
- Message: Minimum 2 characters
- Honeypot field must be empty
- Form timestamp validation
- CSRF token required
