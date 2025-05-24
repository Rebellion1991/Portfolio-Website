# Development Guide

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later
- Git

### Development Environment Setup

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd Portfolio-Website
   ```

1. Install dependencies

   ```bash
   pnpm install
   ```

1. Start the development server

   ```bash
   pnpm dev
   ```

1. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

### Key Directories

- `app/`: Next.js app directory with routes and pages
- `components/`: Reusable React components
- `content/`: JSON data files
- `lib/`: Utility functions and types
- `public/`: Static assets
- `styles/`: Global styles

### Important Files

- `next.config.js`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `components.json`: shadcn/ui configuration
- `tsconfig.json`: TypeScript configuration

## Development Workflow

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

### Component Guidelines

1. Create components in appropriate directories
1. Use TypeScript interfaces for props
1. Follow React best practices
1. Implement proper error handling
1. Add accessibility features
1. Optimize performance
1. Write meaningful comments

### Content Updates

1. Modify JSON files in `content/` directory
1. Follow existing data structure
1. Validate content format
1. Test changes in development

### Adding New Features

1. Create feature branch
1. Implement changes
1. Add/update tests
1. Update documentation
1. Submit pull request

## Performance Optimization

### Image Optimization

- Use `OptimizedImage` component
- Provide width and height
- Use appropriate formats
- Enable/disable priority loading

### Code Splitting

- Use dynamic imports
- Implement lazy loading
- Optimize bundle size

### State Management

- Use React hooks effectively
- Implement proper caching
- Optimize re-renders

## Testing

### Manual Testing

1. Test in different browsers
2. Check responsive design
3. Verify accessibility
4. Test performance
5. Check content rendering

### Automated Testing

- Write unit tests
- Implement integration tests
- Run accessibility tests
- Validate TypeScript types

## Deployment

### Build Process

1. Run type checking

   ```bash
   pnpm type-check
   ```

1. Build for production

   ```bash
   pnpm build
   ```

1. Test production build

   ```bash
   pnpm start
   ```

### Production Considerations

- Enable caching
- Configure CDN
- Monitor performance
- Set up error tracking
- Implement analytics

## Maintenance

### Regular Tasks

1. Update dependencies
1. Check for security issues
1. Monitor performance
1. Update content
1. Backup data

### Troubleshooting

1. Check error logs
1. Verify configurations
1. Test in development
1. Check dependencies
1. Review recent changes

## Best Practices

### Code Quality

- Write clean, maintainable code
- Follow DRY principle
- Implement proper error handling
- Add meaningful comments
- Use TypeScript effectively

### Performance

- Optimize images
- Minimize dependencies
- Implement caching
- Use code splitting
- Optimize bundle size

### Accessibility

- Add ARIA labels
- Ensure keyboard navigation
- Maintain color contrast
- Provide alt text
- Test with screen readers

### Security

- Validate input data
- Implement CSRF protection
- Use secure dependencies
- Follow security best practices
- Regular security audits

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Brevo (formerly Sendinblue) API key
BREVO_API_KEY=your-api-key

# Contact form email address
CONTACT_EMAIL=your-email@domain.com
```

### Setting up Brevo Email Service

1. Create an account at [Brevo](https://www.brevo.com)
2. Navigate to SMTP & API under Settings
3. Generate a new API key
4. Copy the API key to your `.env.local` file
5. Update the contact email in `.env.local`

### Security Features

The project includes several security measures:

1. **CSRF Protection**

   - Implemented in Contact Form
   - Uses unique tokens per session
   - Validates on server side

2. **Rate Limiting**

   - 5 attempts per hour per IP
   - Prevents brute force attacks
   - Configurable windows and limits

3. **Spam Prevention**

   - Honeypot fields
   - Form timestamp validation
   - Server-side validation

4. **Error Handling**
   - Graceful error displays
   - User-friendly messages
   - Detailed server logs
