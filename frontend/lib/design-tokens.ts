// Design tokens for consistent, accessible spacing, sizing, and animations
// Based on Material Design 3 and Apple HIG spacing scales (4dp/8dp incremental)

export const designTokens = {
  // Spacing scale (4pt/8dp incremental)
  spacing: {
    xxs: "0.25rem", // 4px
    xs: "0.5rem", // 8px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
    section: "6rem", // 96px
  },

  // Touch target sizes (minimum 44x44px for Apple HIG, 48x48dp for Material)
  touchTarget: {
    min: "2.75rem", // 44px
    sm: "2.75rem", // 44px (icon button)
    md: "3rem", // 48px (regular button)
    lg: "3.5rem", // 56px (large button)
  },

  // Typography scale (16px base)
  typography: {
    displayXl: {
      fontSize: "2.75rem", // 44px
      lineHeight: 1.1,
      fontWeight: 600,
    },
    displayLg: {
      fontSize: "2rem", // 32px
      lineHeight: 1.2,
      fontWeight: 600,
    },
    headingLg: {
      fontSize: "1.5rem", // 24px
      lineHeight: 1.3,
      fontWeight: 600,
    },
    headingSm: {
      fontSize: "1.25rem", // 20px
      lineHeight: 1.4,
      fontWeight: 600,
    },
    bodyMd: {
      fontSize: "1rem", // 16px
      lineHeight: 1.5,
      fontWeight: 400,
    },
    bodySm: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.5,
      fontWeight: 400,
    },
    label: {
      fontSize: "0.75rem", // 12px
      lineHeight: 1.4,
      fontWeight: 500,
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
    },
  },

  // Animation durations (150-300ms standard, >300ms for complex)
  animation: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    complex: "400ms",
  },

  // Easing functions
  easing: {
    enterEase: "cubic-bezier(0.4, 0, 0.2, 1)", // ease-out
    exitEase: "cubic-bezier(0.4, 0, 1, 1)", // ease-in
    standard: "cubic-bezier(0.4, 0, 0.6, 1)",
  },

  // Breakpoints (mobile-first)
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-index scale (prevents conflicts)
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    tooltip: 50,
    notification: 60,
  },

  // Shadows (elevation scale)
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
  },

  // Border radius scale
  radius: {
    xs: "0.25rem", // 4px
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    full: "9999px",
  },

  // Color tokens (semantic, not raw hex)
  colors: {
    primary: "#0066cc",
    primaryLight: "#e6f2ff",
    error: "#cc0000",
    errorLight: "#ffe6e6",
    success: "#00cc00",
    successLight: "#e6ffe6",
    warning: "#ff9900",
    warningLight: "#fff4e6",
    surface: "#ffffff",
    surfaceAlt: "#f5f5f5",
    surfaceDark: "#1a1a1a",
    text: "#000000",
    textSecondary: "#666666",
    textMuted: "#999999",
    border: "#e0e0e0",
  },
};

// Responsive padding helper
export const responsivePadding = {
  mobile: "1rem", // 16px
  tablet: "1.5rem", // 24px
  desktop: "2rem", // 32px
};

// Responsive font size helper (ensures 16px minimum on mobile)
export const responsiveFont = {
  body: {
    mobile: "1rem",
    tablet: "1rem",
    desktop: "1rem",
  },
  heading: {
    mobile: "1.5rem",
    tablet: "2rem",
    desktop: "2.5rem",
  },
};
