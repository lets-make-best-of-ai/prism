---
name: Lumina Wealth
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#c4c7c9'
  on-tertiary: '#2d3133'
  tertiary-container: '#a0a3a5'
  on-tertiary-container: '#36393b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  numeric-data:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for high-stakes wealth management, prioritizing precision, institutional trust, and a forward-thinking "Future of Finance" aesthetic. The brand personality is authoritative yet approachable, utilizing a **Corporate Modern** foundation infused with **Glassmorphism** to signify transparency and technical sophistication.

The interface targets high-net-worth individuals and modern investors who value data density without clutter. The emotional response should be one of "controlled growth"—calm, secure, and technologically superior. Visuals are characterized by deep backgrounds that recede, allowing emerald primary actions and indigo highlights to guide the user's eye toward growth metrics and critical decisions.

## Colors

The palette is optimized for long-session readability in dark mode. 

- **Primary (#10B981):** "Growth Emerald." Reserved for success states, profit indicators, and primary call-to-action buttons. It signifies wealth accumulation.
- **Secondary (#6366F1):** "Electric Indigo." Used for active navigational states, focus indicators, and data visualization highlights. It adds a technical, "pro-tool" edge.
- **Neutral/Background (#0F172A):** "Deep Slate." Provides a stable, low-strain foundation. 
- **Surface (#1E293B):** Used for cards and elevated containers to create depth against the deep slate base.
- **Semantic Colors:** Error states should use a crisp Rose (#F43F5E), while warnings use Amber (#F59E0B).

## Typography

The typographic scale emphasizes clarity for complex data. 

**Hanken Grotesk** is used for headlines to provide a sharp, contemporary feel. **Inter** handles the bulk of body text for its exceptional legibility at small sizes. **Geist** is introduced for labels and numeric data; its mono-spaced influence ensures that fluctuating stock prices and balance figures remain perfectly aligned and easy to scan.

Always use high-contrast white (#F8FAFC) for primary headings and a muted slate-gray (#94A3B8) for secondary body text to establish a clear information hierarchy.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Rhythm:** A strict 8px spacing system governs all margins and paddings. 
- **Data Tables:** Use compact vertical spacing (8px or 12px) to maximize information density.
- **Dashboards:** Utilize "Safe Margins" of 40px on desktop to allow the glassmorphic cards to breathe against the dark background.
- **Breakpoints:** Mobile (<640px), Tablet (641px - 1024px), Desktop (>1025px). On mobile, horizontal padding reduces to 16px to maximize screen real estate for charts.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional heavy shadows.

- **Level 1 (Base):** The primary background (#0F172A).
- **Level 2 (Cards):** Surface color (#1E293B) with a 1px border of `rgba(255, 255, 255, 0.08)`.
- **Level 3 (Modals/Overlays):** A semi-transparent background (`rgba(30, 41, 59, 0.7)`) with a 20px backdrop-blur. 
- **Glows:** Active elements (like focused inputs or selected portfolio cards) utilize a "Neon Glow"—a soft outer shadow using the secondary indigo color with a 15px blur and 0.3 opacity to simulate a light-emitting display.

## Shapes

The design system uses a **Rounded** (8px) corner radius as the standard. This strikes a balance between the clinical sharpness of finance and the friendliness of modern SaaS.

- **Standard Buttons/Inputs:** 8px (rounded-md)
- **Feature Cards/Large Containers:** 16px (rounded-lg)
- **Status Pills/Tags:** 9999px (full pill)
- **Checkboxes:** 4px (rounded-sm) to maintain a precise, technical look.

## Components

### Buttons
- **Primary:** Solid Emerald (#10B981) with white text. High-gloss finish.
- **Secondary:** Ghost style with an Electric Indigo (#6366F1) 1px border. On hover, a subtle indigo glow appears.
- **Tertiary:** Transparent background with indigo text for low-priority actions.

### Cards
Cards must use the glassmorphic style: a dark, semi-transparent fill, a thin light-colored top border (inner stroke), and a 20px backdrop-blur. This ensures they "pop" against the deep slate background.

### Input Fields
Inputs are dark-filled with a subtle slate border. On **Focus**, the border transitions to Electric Indigo and gains a soft 8px indigo outer glow. Labels should use the `label-sm` (Geist) typography style.

### Progress Stepper
A "Sophisticated Stepper" using thin 2px lines. Completed steps are Emerald; the current step is a pulsing Indigo dot; future steps are muted Slate.

### Portfolio Chips
Small, pill-shaped tags used for asset classes (e.g., "Crypto," "Equity"). Use a low-opacity version of the primary/secondary colors for the background with full-opacity text to ensure readability without visual noise.