# Portfolio Development Guide

## Quick Start

### Running the Development Server
```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your portfolio.

## Project Structure

### Components Organization

#### Layout Components (`components/layout/`)
- **Navigation.tsx** - Top navigation bar with smooth scroll
- **Footer.tsx** - Page footer

#### Section Components (`components/sections/`)
- **HeroSection.tsx** - Landing page hero
- **AboutSection.tsx** - About me information
- **SkillsSection.tsx** - Skills and expertise
- **ProjectsSection.tsx** - Featured projects
- **ExperienceSection.tsx** - Work experience timeline
- **EducationSection.tsx** - Education and certifications
- **ContactSection.tsx** - Contact information and form

#### Common Components (`components/common/`)
- **ThemeToggle.tsx** - Light/Dark theme switcher

### Importing Components

Use the index files for cleaner imports:

```tsx
// Layout components
import { Navigation, Footer } from "@/components/layout"

// Section components
import { HeroSection, AboutSection } from "@/components/sections"

// Common components
import { ThemeToggle } from "@/components/common"
```

## Customization Guide

### Update Projects
Edit `components/sections/ProjectsSection.tsx`:
```tsx
const projects = [
  {
    title: "Your Project Name",
    description: "Project description",
    technologies: ["React", "Node.js", "etc"],
    github: "https://github.com/yourusername/repo",
    demo: "https://your-demo.com",
    featured: true,
  },
  // Add more projects...
]
```

### Update Personal Information
Edit `components/sections/AboutSection.tsx` and `components/sections/HeroSection.tsx`

### Update Skills
Edit `components/sections/SkillsSection.tsx`:
```tsx
const skillCategories = [
  {
    category: "Category Name",
    skills: ["Skill 1", "Skill 2"],
    icon: IconComponent,
  },
]
```

### Add More Experience/Education
Edit the respective section files and add items to the arrays.

### Change Color Theme
Edit `app/globals.css` - modify the CSS variables in `:root` and `.dark` sections.

## Theme Customization

### Current Color Scheme

**Light Mode:**
- Primary: Blue (#2563eb)
- Background: White (#ffffff)
- Secondary: Light slate (#f1f5f9)

**Dark Mode:**
- Primary: Light blue (#60a5fa)
- Background: Dark slate (#0f172a)
- Secondary: Medium slate (#334155)

### To Change Colors:
1. Open `app/globals.css`
2. Modify the RGB values in `:root` and `.dark` sections
3. Save and see changes instantly

## Navigation Sections

Current sections in order:
1. Hero (landing)
2. About
3. Skills
4. Experience
5. Education
6. Projects
7. Contact

To reorder, edit `app/portfolio/page.tsx` and rearrange the section components.

## Authentication

The portfolio uses Clerk for authentication:
- Sign in: `/sign-in`
- Sign up: `/sign-up`
- Protected route: `/portfolio`

Users must sign in to view the portfolio content.

## Responsive Design

All components are responsive:
- Mobile: Single column layout
- Tablet: Adapted grid layouts
- Desktop: Full multi-column layouts

## Smooth Scrolling

Enabled globally in `app/globals.css`:
```css
html {
  scroll-behavior: smooth;
}
```

Navigation links automatically scroll to sections with smooth animation.

## Best Practices

1. **Keep sections modular** - Each section is independent
2. **Use index files** - Cleaner imports
3. **Maintain consistency** - Follow existing patterns
4. **Test responsiveness** - Check on multiple screen sizes
5. **Use TypeScript** - Maintain type safety

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repository to Vercel
3. Configure environment variables (Clerk keys)
4. Deploy

### Environment Variables
Required for Clerk authentication:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Clerk documentation: https://clerk.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
