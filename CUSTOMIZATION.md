# Customization Guide - Prism Equity Partners

## Brand & Content Updates

### Update Company Information

**Header Logo & Navigation** (`components/Header.tsx`):
```tsx
<div className="text-2xl font-bold tracking-tight">
  <span className="gradient-text">Prism</span>
  <span className="text-white ml-2">Equity</span>
</div>
```

**Footer Company Info** (`components/Footer.tsx`):
```tsx
<div>
  <div className="text-xl font-bold mb-4">
    <span className="gradient-text">Prism</span>
    <span className="text-white ml-2">Equity</span>
  </div>
  <p className="text-prism-gray text-sm">Keep What You Earn. Build What You Dream.</p>
</div>
```

### Update Contact Information

**Header CTA Button** (`components/Header.tsx`):
- Change email/phone link in `onClick` handlers

**Footer Links** (`components/Footer.tsx`):
- Update service links
- Add real team pages
- Add contact information

**CTA Section** (`components/CTASection.tsx`):
```tsx
onClick={() => window.open('tel:+1-555-0100')}
```

### Update Copy & Messaging

**Hero Section** (`components/Hero.tsx`):
- Main headline
- Subheadline
- CTA button text
- Trust indicators

**Problem Section** (`components/ProblemSection.tsx`):
- Section title and body copy
- Update statistics to match your data

**Solution Section** (`components/SolutionSection.tsx`):
- Update the three pillars of your framework
- Modify icons and descriptions
- Add or remove benefit cards

## Color Customization

Edit `tailwind.config.js`:

```javascript
colors: {
  'prism-dark': '#0a0e27',      // Main background
  'prism-navy': '#1a1f3a',      // Secondary background
  'prism-emerald': '#10b981',   // Primary action/accent
  'prism-gold': '#fbbf24',      // Secondary accent
  'prism-gray': '#9ca3af',      // Secondary text
}
```

### Quick Color Palette Options

**Cool Professional:**
```javascript
'prism-dark': '#0f172a',
'prism-navy': '#1e293b',
'prism-emerald': '#06b6d4',
'prism-gold': '#f59e0b',
```

**Warm Luxury:**
```javascript
'prism-dark': '#1a1410',
'prism-navy': '#2d2015',
'prism-emerald': '#b45309',
'prism-gold': '#f97316',
```

**Modern Tech:**
```javascript
'prism-dark': '#0a0e27',
'prism-navy': '#1a2847',
'prism-emerald': '#00d9ff',
'prism-gold': '#ff006e',
```

## Typography

Edit `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Your-Font-Name', 'system-ui', 'sans-serif'],
}
```

**Add Google Font:**

1. Update `app/layout.tsx`:
```tsx
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

2. Update `tailwind.config.js`

## Layout Changes

### Add More Sections

Create new component (e.g., `components/TestimonialsSection.tsx`):

```tsx
'use client'

export default function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="section-container">
        {/* Your testimonials content */}
      </div>
    </section>
  )
}
```

Add to `app/page.tsx`:
```tsx
import TestimonialsSection from '@/components/TestimonialsSection'

export default function Home() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
```

### Modify Hero Section SVG Prism

Edit `components/Hero.tsx` SVG coordinates to change the prism shape:

```tsx
<svg width="400" height="400" viewBox="0 0 400 400">
  {/* Change polygon points and line coordinates */}
  <polygon points="200,50 350,300 200,350 50,300" />
</svg>
```

## Form Integration

### Connect Email Capture

`components/CTASection.tsx` currently logs submissions. To connect a real service:

**Option 1: Vercel KV (Database)**
```tsx
import { kv } from '@vercel/kv'

const handleSubmit = async (e: React.FormEvent) => {
  // ... form logic
  await kv.lpush('leads', JSON.stringify({ email, timestamp }))
}
```

**Option 2: Third-party Service (Mailchimp, HubSpot)**
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
  // Handle response
}
```

Create `app/api/subscribe/route.ts`:
```typescript
export async function POST(request: Request) {
  const { email } = await request.json()
  // Call your email service
  return Response.json({ success: true })
}
```

## SEO Optimization

### Update Metadata

`app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your Company | Tax Strategy & Wealth Building',
  description: 'Your unique value proposition here',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
}
```

### Add Schema Markup

Create `app/schema.ts`:
```typescript
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prism Equity Partners",
  "url": "https://your-domain.com",
  "contact": {
    "@type": "ContactPoint",
    "telephone": "+1-555-0100",
    "contactType": "Customer Service"
  }
}
```

## Image & Media

### Add Product Images/Screenshots

Create `public/` folder for static assets:

```
public/
  ├── logo.png
  ├── hero-image.jpg
  └── features/
      ├── feature-1.jpg
      └── feature-2.jpg
```

Use in components:
```tsx
import Image from 'next/image'

<Image 
  src="/hero-image.jpg" 
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

## Performance Fine-tuning

### Enable Image Optimization

Edit `next.config.js`:
```javascript
export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}
```

### Add Compression

```bash
npm install next-compress
```

## Mobile Responsiveness Testing

All breakpoints use Tailwind's responsive prefixes:

- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)

To adjust, modify utility classes:
```tsx
<div className="text-base sm:text-lg md:text-xl lg:text-2xl">
  Responsive text
</div>
```

## Animation Customization

Edit `app/globals.css` and `tailwind.config.js`:

```javascript
keyframes: {
  customAnimation: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
},
animation: {
  'custom': 'customAnimation 0.5s ease-out',
}
```

Apply to elements:
```tsx
<div className="animate-custom">Animated element</div>
```

## Dark/Light Mode Toggle (Optional)

To add theme switching:

```bash
npm install next-themes
```

Update `app/layout.tsx`:
```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Analytics Integration

### Google Analytics
```bash
npm install next-gtag
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from 'next-gtag'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
```

## Need Help?

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Documentation: https://react.dev
