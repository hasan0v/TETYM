# Technology Context: BSU SSTCC Website

This document outlines the technical context for the BSU SSTCC (Student Scientific-Technical Creativity Center) website project, with a focus on the successfully completed clubs, blog, and about pages with their bilingual implementation.

## Technology Stack

### Frontend
* **Framework**: Next.js 13.4+ with App Router
* **UI Library**: React 18+
* **Styling**: Tailwind CSS with custom components
* **State Management**: React Context API for global state management
* **Internationalization**: Custom i18n implementation with type safety
* **Component Library**: Custom-built UI components with Tailwind

### Backend
* **API Routes**: Next.js API routes (server components)
* **Database**: Supabase (PostgreSQL)
* **Authentication**: Supabase Auth (planned)
* **Storage**: Supabase Storage for images and files (planned)
* **Serverless Functions**: Vercel Serverless Functions (planned)

### Content Management
* **Markdown Processing**: react-markdown for blog content rendering
* **Form Handling**: React Hook Form with Zod validation
* **Image Optimization**: Next.js Image component with placeholder fallbacks

## Development Environment

* **IDE**: Visual Studio Code with ESLint, Prettier, and Tailwind CSS extensions
* **Version Control**: Git with GitHub
* **Package Management**: npm
* **Node.js Version**: 16+ LTS
* **Local Development**: Next.js development server
* **Environment Variables**: .env.local for local development

## Project Structure

```
/app
  /api           # API routes
  /[locale]      # Internationalized routes
    /clubs       # Clubs pages
      /[id]      # Club detail page
      page.tsx   # Clubs listing page
    /blog        # Blog pages
      /[id]      # Blog post detail page
      page.tsx   # Blog listing page
    /about       # About page
      page.tsx   # About page
  /components    # Shared UI components
  /lib           # Utility functions and shared libraries
    language.ts  # Translation system
  /public        # Static assets
  /styles        # Global styles
```

## Key Technical Implementations

### Internationalization System
* Custom i18n implementation with TypeScript for type safety
* Language detection based on URL path
* Translations stored in typed objects in `/lib/language.ts`
* Support for Azerbaijani and English languages

### Club Pages Implementation
* `/clubs` - Listing page with filtering by category, member count, and search functionality
* `/clubs/[id]` - Detail page showing club information, events, and achievements
* Responsive grid layout with CSS Grid and Flexbox
* Filter components using custom dropdown selectors

### Blog Pages Implementation
* `/blog` - Listing page with filtering by category, date, and search functionality
* `/blog/[id]` - Detail page with markdown rendering and related posts
* Markdown content rendering with react-markdown
* Code syntax highlighting for technical blog posts

### About Page Implementation
* Sections for mission, history, team information, and contact details
* Responsive layout with mobile-first approach
* Interactive team member cards with expandable information
* Contact form with form validation

## Performance Considerations

* **Image Optimization**: Next.js Image component with proper sizing and WebP format
* **Code Splitting**: Automatic code splitting through Next.js
* **Lazy Loading**: Implementation of lazy loading for off-screen content
* **Caching Strategies**: Static generation where possible, ISR for dynamic content
* **Bundle Size**: Regular monitoring and optimization of bundle size

## Security Measures

* **Input Validation**: Form inputs validated client-side and server-side
* **Content Security**: Markdown sanitization for user-generated content
* **API Protection**: Rate limiting on API routes (planned)
* **Authentication**: Role-based access control for admin functions (planned)

## Technical Debt

* **Translation System**: Some duplicate translation keys need to be resolved
* **Type Definitions**: Need more comprehensive type definitions for data models
* **Component Styling**: Some components have inconsistent styling approaches
* **Error Handling**: Need more consistent error handling across the application
* **Testing**: Lack of automated tests for critical components

## Future Technical Considerations

* **Supabase Integration**: Need to implement data fetching from Supabase
* **Admin Dashboard**: Plan to create admin interfaces for content management
* **Authentication**: Implementation of user authentication system
* **Testing Framework**: Need to implement Jest and React Testing Library for automated tests
* **CI/CD Pipeline**: Plan to set up GitHub Actions for automated testing and deployment

## Development Guidelines

* **Code Style**: Follow ESLint and Prettier configurations
* **Component Structure**: Use functional components with hooks
* **State Management**: Use React Context for global state, local state for component-specific state
* **Type Safety**: Enforce strict TypeScript typing for all components and functions
* **File Naming**: Use kebab-case for files, PascalCase for components
* **Commit Messages**: Follow conventional commit format

## Deployment Process

* **Development**: Local development server with hot reloading
* **Staging**: Deployment to Vercel preview environments
* **Production**: Deployment to Vercel production environment
* **Monitoring**: Vercel Analytics for performance monitoring

Last Updated: May 8, 2025