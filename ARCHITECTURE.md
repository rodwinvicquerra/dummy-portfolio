# Component Architecture

## Overview
This portfolio follows a modular component architecture with clear separation of concerns.

## Directory Structure

```
components/
├── common/           # Reusable utility components
│   ├── ThemeToggle.tsx
│   └── index.ts
│
├── layout/           # Layout components (Navigation, Footer)
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── index.ts
│
├── sections/         # Main content sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── EducationSection.tsx
│   ├── ContactSection.tsx
│   └── index.ts
│
└── ui/              # Shadcn UI components
    ├── button.tsx
    ├── card.tsx
    ├── badge.tsx
    └── ... (all other UI primitives)
```

## Component Categories

### 1. Layout Components
**Purpose:** Structure and navigation

- **Navigation**
  - Fixed top navbar
  - Smooth scroll to sections
  - Mobile responsive menu
  - Theme toggle integration
  - User authentication display

- **Footer**
  - Copyright information
  - Technology stack credits

### 2. Section Components
**Purpose:** Main content blocks of the portfolio

All sections follow a consistent pattern:
- Responsive container with max-width
- Clean heading typography
- Card-based content layout
- Subtle hover effects
- Mobile-first responsive design

#### HeroSection
- Profile image
- Name and title
- Brief introduction
- Call-to-action buttons
- Social media links

#### AboutSection
- Personal information cards
- Current focus
- Bio paragraphs
- Side projects
- Family business mention

#### SkillsSection
- Categorized skills (Frontend, Backend, Database)
- Icon-based cards
- Badge display for individual skills
- Clean grid layout

#### ProjectsSection
- Featured project cards
- Technology stack badges
- GitHub and Demo links
- Placeholder content ready for real projects

#### ExperienceSection
- Timeline layout with visual line
- Job title and company
- Period worked
- Description and achievements
- Technology tags

#### EducationSection
- Current degree information
- Institution details
- Certifications and achievements
- Awards display

#### ContactSection
- Contact information cards
- Copy-to-clipboard functionality
- Direct action buttons (Email, Call)
- Interactive hover states

### 3. Common Components
**Purpose:** Shared utilities used across the app

- **ThemeToggle**
  - Light/Dark mode switcher
  - Smooth transition
  - Icon-based toggle
  - Persistent theme preference

### 4. UI Components
**Purpose:** Basic building blocks from Shadcn UI

Pre-built, customizable components:
- Button
- Card
- Badge
- Input
- And many more...

## Component Patterns

### Client Components
All interactive components use `"use client"` directive:
```tsx
"use client"

export function ComponentName() {
  // Component logic
}
```

### Import Pattern
```tsx
// Named exports with index files
import { Navigation, Footer } from "@/components/layout"
import { HeroSection } from "@/components/sections"
```

### Styling Pattern
- Tailwind CSS utility classes
- Responsive design with breakpoints (sm, md, lg)
- CSS variables for theming
- Hover states and transitions

### State Management
- React hooks (useState, useEffect)
- Clerk hooks for authentication
- Next.js hooks (useRouter, useTheme)

## Design System

### Spacing Scale
- `px-4` / `py-4` - Small spacing
- `px-6` / `py-6` - Medium spacing
- `px-8` / `py-8` - Large spacing
- `px-4 sm:px-6 lg:px-8` - Responsive spacing

### Typography Scale
- `text-3xl md:text-4xl` - Section headings
- `text-xl` - Subsection headings
- `text-base` / `text-lg` - Body text
- `text-sm` - Small text, labels

### Color Usage
- `bg-background` - Main background
- `bg-card` - Card backgrounds
- `text-foreground` - Main text
- `text-muted-foreground` - Secondary text
- `text-primary` - Accent/brand color
- `border-border` - Borders

### Component Sizing
- `max-w-4xl` - Narrow sections (About, Contact)
- `max-w-6xl` - Medium sections (Skills, Education)
- `max-w-7xl` - Wide sections (Navigation, full-width)

## Responsive Breakpoints

```tsx
// Mobile first approach
className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
```

- **Default (< 640px):** Mobile
- **sm (≥ 640px):** Small tablets
- **md (≥ 768px):** Tablets
- **lg (≥ 1024px):** Desktops
- **xl (≥ 1280px):** Large screens

## Best Practices

### 1. Component Composition
```tsx
// Good: Compose with smaller components
<Card className="p-6">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### 2. Consistent Props
```tsx
// Use consistent prop patterns
interface SectionProps {
  className?: string
  children?: React.ReactNode
}
```

### 3. Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

### 4. Performance
- Use `"use client"` only when needed
- Lazy load images
- Optimize re-renders
- Memoize expensive calculations

## Adding New Sections

1. Create new file in `components/sections/`
2. Follow existing section patterns
3. Export from `components/sections/index.ts`
4. Import and add to `app/portfolio/page.tsx`
5. Add navigation link in `Navigation.tsx`

Example:
```tsx
// components/sections/NewSection.tsx
export function NewSection() {
  return (
    <section id="new-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Section Title
        </h2>
        {/* Content */}
      </div>
    </section>
  )
}
```

## Maintenance

- Keep components focused and single-purpose
- Update index files when adding new components
- Maintain consistent styling patterns
- Document complex logic
- Test responsive behavior
- Keep accessibility in mind

## Future Enhancements

Potential improvements:
- Add loading states
- Implement error boundaries
- Add animations (subtle)
- Optimize images with Next/Image
- Add more interactive elements
- Implement contact form backend
- Add blog section
- Add testimonials section
