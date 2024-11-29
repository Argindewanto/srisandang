# SriSandang Project - Getting Started Guide

## Project Overview
SriSandang is a B2B Custom Clothing & Safety Wear company website built with Next.js 13. The project focuses on lead generation and product showcase.

## Prerequisites
- Node.js 18+ installed
- Git
- Basic knowledge of:
  - React & Next.js
  - TypeScript
  - Tailwind CSS
  - Firebase


## Project Structure

### Key Directories

src/
├── app/ # Next.js 13 App Router
│ ├── (public)/ # Public pages
│ └── admin/ # Admin panel pages
├── components/
│ ├── ui/ # Reusable UI components
│ └── layout/ # Layout components
└── lib/
├── firebase/ # Firebase utilities
└── stores/ # State management

### Core Components
1. **UI Components** (`src/components/ui/`)
   - `buttons.tsx` - WhatsApp & Catalogue buttons
   - `cta.tsx` - Call-to-action component
   - `logo.tsx` - Logo component

2. **Layout Components** (`src/components/layout/`)
   - `public-nav.tsx` - Public navigation
   - `public-footer.tsx` - Public footer

### Key Features
1. **Admin Panel**
   - Products Management
   - Leads Management
   - Articles Management
   - Testimonials Management

2. **Public Pages**
   - Custom Clothing
   - Safety Wear
   - Catalogue Access
   - Articles

## Design System

### Colors
- Brand Primary: `#00CF61`
- Brand Primary Dark: `#00B954`
- Neutrals: 50-900 scale

### Typography
- Display: 52px/56px, 44px/48px
- Headings: h1(32px), h2(24px), h3(20px)
- Body: lg(16px), sm(14px)


## Development Workflow

### 1. Running the Project
Development
npm run dev
Build
npm run build
Production
npm run start


## Common Tasks

### Adding a New Page
1. Create new file in `src/app/(public)` or `src/app/admin`
2. Use existing components and styles
3. Follow TypeScript and ESLint guidelines

### Working with Firebase
1. Use existing utilities in `src/lib/firebase`
2. Follow data structure patterns
3. Handle errors appropriately

### Styling Guidelines
1. Use Tailwind CSS classes
2. Follow design system tokens
3. Maintain responsive design patterns

## Need Help?
- Check the design system at `/admin/design-system`
- Review existing components for patterns
- Follow TypeScript types and interfaces

## Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)