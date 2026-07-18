# Page Structure & Visual Layout - Prism Equity Partners

## Full Page Flow

```
┌─────────────────────────────────────────────────────────┐
│                      HEADER / NAVIGATION                │
│  "Prism Equity Partners"              "Book Session"    │
│  (Sticky, stays at top on scroll)     (CTA Button)      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      HERO SECTION                       │
│                   (Full Screen Height)                  │
│                                                         │
│          [Animated Prism SVG with light rays]          │
│                                                         │
│          "Keep What You Earn.                          │
│           Build What You Dream."                        │
│                                                         │
│          "Uncle Sam has a plan for your money.         │
│           We have a better one..."                      │
│                                                         │
│    [Primary CTA Button]  [Secondary CTA Button]         │
│                                                         │
│    "Trusted by: Fortune 500 | Private Equity |         │
│                 C-Suite | Entrepreneurs"               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               PROBLEM SECTION (Gap Spacing)             │
│               Background: Slightly lighter              │
│                                                         │
│          "Stop Tipping the Government."                 │
│                                                         │
│    "You work hard, take the risks, and                 │
│     sacrifice your time. Yet, standard                 │
│     retail accountants..."                             │
│                                                         │
│    ┌──────────┐  ┌──────────┐                           │
│    │ Stat 1   │  │ Stat 2   │                           │
│    │ $50K-500K│  │40+ Hours │                           │
│    └──────────┘  └──────────┘                           │
│    ┌──────────┐  ┌──────────┐                           │
│    │ Stat 3   │  │ Stat 4   │                           │
│    │ 60% Missed│ │35-40% Rate│                          │
│    └──────────┘  └──────────┘                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              SOLUTION SECTION (Dark Background)         │
│                                                         │
│    "How We Split the Tax Code                          │
│     In Your Favor"                                     │
│                                                         │
│    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│    │ 01           │ │ 02           │ │ 03           │  │
│    │ 🛡️           │ │ 📈           │ │ 👥           │  │
│    │              │ │              │ │              │  │
│    │ Shielding    │ │ Compounding  │ │ Legacy       │  │
│    │ Assets       │ │ Value        │ │ Defense      │  │
│    │              │ │              │ │              │  │
│    │ We scan your │ │ We reroute   │ │ We structure │  │
│    │ operation... │ │ your savings │ │ your estate  │  │
│    │              │ │              │ │              │  │
│    │ → Explore    │ │ → Explore    │ │ → Explore    │  │
│    └──────────────┘ └──────────────┘ └──────────────┘  │
│                                                         │
│    ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│    │Legal &     │ │Customized  │ │Ongoing     │       │
│    │Bulletproof │ │Strategy    │ │Support     │       │
│    └────────────┘ └────────────┘ └────────────┘       │
│    ┌────────────┐                                     │
│    │Measurable  │                                     │
│    │Results     │                                     │
│    └────────────┘                                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               CTA / CONVERSION SECTION                  │
│                                                         │
│               "Your Wealth. Your Rules."               │
│                                                         │
│      [Email Input Field]  [Book Session Button]        │
│                                                         │
│      "Or call us directly →"                           │
│                                                         │
│    "We respect your privacy..."                        │
│                                                         │
│    ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│    │ 500+       │ │ $2B+       │ │ 20+        │       │
│    │ Clients    │ │ Tax        │ │ Years      │       │
│    │ Served     │ │ Savings    │ │ Experience │       │
│    └────────────┘ └────────────┘ └────────────┘       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      FOOTER                            │
│                                                         │
│  Services    | Company    | Legal                       │
│  • Tax       | • About    | • Privacy                   │
│  • Wealth    | • Team     | • Terms                     │
│  • Estate    | • Insights | • Disclaimer               │
│  • Business  | • Contact  | • Careers                  │
│                                                         │
│  © 2026 Prism Equity Partners. All rights reserved.    │
│  Disclaimer: This website is for informational...      │
└─────────────────────────────────────────────────────────┘
```

## Component Breakdown

### HEADER
- **Type**: Sticky navigation (stays at top)
- **Layout**: Flex row with left/right alignment
- **Mobile**: Hamburger menu
- **Colors**: Navy/transparent with white text
- **Hover Effects**: Buttons scale and glow
- **Height**: ~70px

### HERO
- **Type**: Full-screen banner section
- **Layout**: Centered content with animated background
- **Background**: Gradient + animated prism SVG
- **Mobile**: Responsive font sizes (sm/md/lg)
- **CTAs**: Primary (emerald/gold) + Secondary (border only)
- **Animation**: Staggered fade-in animations

### PROBLEM SECTION
- **Type**: Info block with statistics
- **Layout**: Title/copy on left, 2x2 grid on right (responsive)
- **Cards**: Glass-morphism style with border
- **Statistics**: Show key pain points
- **Spacing**: Padding: 6rem vertical, 3rem horizontal

### SOLUTION SECTION
- **Type**: 3-column grid layout
- **Layout**: Responsive (1 col mobile, 2 col tablet, 3 col desktop)
- **Cards**: Glass-morphism with hover effects
- **Icons**: Emoji-based (🛡️ 📈 👥)
- **Bottom Grid**: 4 benefit cards showing features
- **Spacing**: Large gaps between cards

### CTA SECTION
- **Type**: Prominent conversion box
- **Layout**: Centered card with glass background
- **Form**: Email input + submit button
- **Secondary CTA**: "Call us directly" link
- **Trust Signals**: 3 stat cards below form
- **Styling**: Border with accent color

### FOOTER
- **Type**: Information section
- **Layout**: 4-column grid (responsive)
- **Links**: Services, Company, Legal sections
- **Bottom**: Copyright + disclaimer
- **Colors**: Gray text on dark background

## Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Hamburger navigation
- Larger touch targets (48px minimum)
- Stacked cards/sections
- Larger font sizes for readability

### Tablet (640px - 1024px)
- 2-column grids
- Horizontal navigation visible
- Medium padding/spacing
- Readable font sizes

### Desktop (> 1024px)
- Full 3-4 column grids
- Maximum width container (7xl = 80rem)
- Optimal spacing and typography
- Hover effects enabled

## Color Usage

```
┌─────────────────────────────────────────┐
│ Deep Charcoal (#0a0e27)                 │
│ └─ Main background (90% of page)        │
│                                         │
│ Rich Navy (#1a1f3a)                     │
│ └─ Card backgrounds                     │
│ └─ Section alternation                  │
│ └─ Hover states                         │
│                                         │
│ Emerald (#10b981)                       │
│ ├─ Primary CTAs                         │
│ ├─ Accent borders                       │
│ └─ Hover states                         │
│                                         │
│ Gold (#fbbf24)                          │
│ ├─ Secondary accent                     │
│ ├─ Gradient text                        │
│ └─ Highlight hover states               │
│                                         │
│ Gray (#9ca3af)                          │
│ ├─ Secondary body text                  │
│ ├─ Placeholder text                     │
│ └─ Disabled states                      │
└─────────────────────────────────────────┘
```

## Typography Hierarchy

```
H1 (Hero Title)
- Size: 48px (mobile) → 96px (desktop)
- Weight: 700 (bold)
- Color: White with gradient accent
- Spacing: 1.5 line height

H2 (Section Titles)
- Size: 32px (mobile) → 48px (desktop)
- Weight: 700 (bold)
- Color: White
- Spacing: 1.25 line height

H3 (Card Titles)
- Size: 24px
- Weight: 600 (semibold)
- Color: White
- Spacing: 1 line height

Body Text
- Size: 16px-18px
- Weight: 400 (regular)
- Color: Gray (#9ca3af)
- Spacing: 1.6 line height

CTA Buttons
- Font: 14px-16px
- Weight: 600 (semibold)
- Transform: uppercase (tracking)
```

## Animation Timings

```
Fade In
- Duration: 0.6s
- Easing: ease-in-out
- Delay: Staggered (0s, 0.1s, 0.2s...)

Slide Up
- Duration: 0.6s
- Easing: ease-out
- Y-Distance: 30px

Button Hover
- Transform: translateY(-2px)
- Duration: 0.3s
- Opacity: Changes on text color

Scroll Effects
- Fade in on intersection
- Slide up from bottom
- Staggered by element index
```

## Spacing System

```
Base Unit: 0.25rem (4px)

Spacing Scale:
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 12px (0.75rem)
- lg: 16px (1rem)
- xl: 24px (1.5rem)
- 2xl: 32px (2rem)
- 3xl: 48px (3rem)
- 4xl: 64px (4rem)

Padding:
- Page sections: 6rem vertical (desktop), 4rem (mobile)
- Cards: 1.5rem - 2rem
- Content: 1rem - 1.5rem

Gaps:
- Grid gaps: 1.5rem - 2rem
- Component gaps: 0.5rem - 1rem
```

## Interactive Elements

### Buttons
```
Primary (Emerald/Gold Gradient)
- Background: gradient-to-r from-emerald to-gold
- Text: Dark text (high contrast)
- Hover: scale(1.05) + shadow-glow
- Active: slight opacity change

Secondary (Border Only)
- Background: transparent
- Border: 2px emerald
- Text: Emerald
- Hover: bg-emerald/10 + shadow
```

### Forms
```
Input Fields
- Background: prism-navy/50
- Border: 1px white/10
- Focus: border-emerald + ring-emerald/30
- Placeholder: gray text
- Padding: 0.75rem 1rem
```

## Accessibility Features

✅ Semantic HTML (header, nav, section, article, footer)
✅ ARIA labels on interactive elements
✅ Focus states visible (2px outline)
✅ High contrast colors (WCAG AA)
✅ Touch targets min 48px (mobile)
✅ Keyboard navigation support
✅ Skip-to-content links ready
✅ Form labels and descriptions

---

This structure creates a premium, high-converting landing page optimized for both aesthetics and conversion.
