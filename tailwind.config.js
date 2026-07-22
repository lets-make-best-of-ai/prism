/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      /* ═══════════════════════════════════════════════════════════════
         FINTECH PREMIUM DESIGN SYSTEM - Color Palette
         ═══════════════════════════════════════════════════════════════ */
      colors: {
        /* Foundation: Slate & Charcoal - Premium dark backgrounds */
        'fintech': {
          'canvas': '#0B0F19',        /* Background Canvas - Ultimate depth */
          'surface': '#161C2A',       /* Card Surfaces - Elevated depth */
          'border': '#242F41',        /* Borders - Subtle definition */
          'hover': '#1F2937',         /* Hover state - Interactive feedback */
          'focus': '#2D3D52',         /* Focus state - Accessibility */
        },

        /* Accent: Emerald - Trust, security, tax benefit communication */
        'emerald': {
          'primary': '#10B981',       /* Primary action - Trust signal */
          'hover': '#059669',         /* Hover state - Interactive feedback */
          'light': '#D1FAE5',         /* Light variant - Backgrounds */
          'dark': '#047857',          /* Dark variant - Emphasis */
        },

        /* Text Hierarchy - Optimized for readability */
        'text': {
          'primary': '#F9FAFB',       /* Primary text - Maximum contrast */
          'secondary': '#9CA3AF',     /* Secondary text - Information hierarchy */
          'muted': '#6B7280',         /* Muted text - De-emphasized content */
          'inverse': '#1F2937',       /* Inverse - Light backgrounds */
        },

        /* Legacy support - Mapping to new system */
        'prism-dark': '#0B0F19',
        'prism-navy': '#161C2A',
        'prism-emerald': '#10B981',
        'prism-gold': '#10B981',
        'prism-gray': '#9CA3AF',

        /* Stitch Design System - Lumina Wealth */
        'surface-container': '#171f33',
        'surface-container-low': '#131b2e',
        'surface-container-high': '#222a3d',
        'surface-container-highest': '#2d3449',
        'surface-container-lowest': '#060e20',
        'primary-container': '#10b981',
        'on-primary-container': '#00422b',
        'secondary-fixed-dim': '#c0c1ff',
        'primary-fixed': '#6ffbbe',
        'on-secondary': '#1000a9',
        'on-surface-variant': '#bbcabf',
        'on-background': '#dae2fd',
        'inverse-surface': '#dae2fd',
        'surface-variant': '#2d3449',
        'on-secondary-fixed': '#07006c',
        'surface-dim': '#0b1326',
        'on-tertiary-fixed': '#191c1e',
        'on-surface': '#dae2fd',
        'inverse-on-surface': '#283044',
        'outline': '#86948a',
        'secondary': '#c0c1ff',
        'on-primary-fixed': '#002113',
        'secondary-fixed': '#e1e0ff',
        'on-secondary-fixed-variant': '#2f2ebe',
        'on-primary': '#003824',
        'on-error': '#690005',
        'primary': '#4edea3',
        'tertiary': '#c4c7c9',
        'on-tertiary-container': '#36393b',
        'outline-variant': '#3c4a42',
        'surface-bright': '#31394d',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        'on-secondary-container': '#b0b2ff',
        'on-tertiary-fixed-variant': '#444749',
        'background': '#0b1326',
        'on-tertiary': '#2d3133',
        'tertiary-fixed-dim': '#c4c7c9',
        'tertiary-fixed': '#e0e3e5',
        'surface-tint': '#4edea3',
        'inverse-primary': '#006c49',
        'secondary-container': '#3131c0',
        'on-primary-fixed-variant': '#005236',
        'tertiary-container': '#a0a3a5',
        'surface': '#0b1326',
        'primary-fixed-dim': '#4edea3',
        'error': '#ffb4ab',
      },

      /* ═══════════════════════════════════════════════════════════════
         Typography: Modern font stack with fallbacks
         ═══════════════════════════════════════════════════════════════ */
      fontFamily: {
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Hanken Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        'headline': ['Hanken Grotesk'],
        'body': ['Inter'],
        'label': ['Geist'],
        'numeric': ['Geist'],
      },

      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        'sm': ['13px', { lineHeight: '20px', letterSpacing: '0.3px' }],
        'base': ['14px', { lineHeight: '21px', letterSpacing: '0.2px' }],
        'lg': ['16px', { lineHeight: '24px', letterSpacing: '0.1px' }],
        'xl': ['18px', { lineHeight: '28px', letterSpacing: '0px' }],
        '2xl': ['20px', { lineHeight: '30px', letterSpacing: '0px' }],
        '3xl': ['24px', { lineHeight: '36px', letterSpacing: '-0.5px' }],
        '4xl': ['32px', { lineHeight: '42px', letterSpacing: '-1px' }],
        '5xl': ['40px', { lineHeight: '50px', letterSpacing: '-1.5px' }],
        /* Stitch typography scale */
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '500' }],
        'numeric-data': ['20px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      /* ═══════════════════════════════════════════════════════════════
         Shadows & Depth: Subtle, premium depth with clean radii
         ═══════════════════════════════════════════════════════════════ */
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',         /* Primary interactive element radius */
        '2xl': '16px',        /* Large component radius */
        '3xl': '20px',        /* Extra large components */
        'full': '9999px',
      },

      boxShadow: {
        /* Fintech-specific shadow scale */
        'none': 'none',
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'base': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
        '2xl': '0 30px 60px rgba(0, 0, 0, 0.2)',

        /* Interactive shadows with emerald accent */
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.2), 0 0 40px rgba(16, 185, 129, 0.1)',
        'emerald-focus': '0 0 0 4px rgba(16, 185, 129, 0.1)',

        /* Fintech-premium elevation */
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.12)',
        'elevation-2': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 8px 16px rgba(0, 0, 0, 0.18)',
        'elevation-4': '0 12px 24px rgba(0, 0, 0, 0.2)',
      },

      /* ═══════════════════════════════════════════════════════════════
         Spacing: Refined scale for premium layouts
         ═══════════════════════════════════════════════════════════════ */
      spacing: {
        '0': '0px',
        'px': '1px',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
        '56': '224px',
        '60': '240px',
        '64': '256px',
        '72': '288px',
        '80': '320px',
        '96': '384px',
        /* Stitch spacing system */
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        'margin-mobile': '16px',
        'margin-desktop': '40px',
        'container-max': '1280px',
        'gutter': '24px',
      },

      /* ═══════════════════════════════════════════════════════════════
         Animations: Premium micro-interactions
         ═══════════════════════════════════════════════════════════════ */
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-delayed': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'pulse-emerald': 'pulseEmerald 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseEmerald: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },

      /* ═══════════════════════════════════════════════════════════════
         Transitions: Refined animation curves for premium feel
         ═══════════════════════════════════════════════════════════════ */
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },

  plugins: [],
}
