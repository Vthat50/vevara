/**
 * Enterprise Design System
 *
 * Neutral, professional design constants matching enterprise platforms
 * like Salesforce, Authenticx, and CallMiner
 */

// ============================================================
// COLOR PALETTE - Neutral & Minimal
// ============================================================

export const colors = {
  // Neutrals (primary palette - use 90% of the time)
  neutral: {
    50: '#FAFAFA',   // Background subtle
    100: '#F5F5F5',  // Background hover
    200: '#E5E5E5',  // Border light
    300: '#D4D4D4',  // Border default
    400: '#A3A3A3',  // Text muted
    500: '#737373',  // Text secondary
    600: '#525252',  // Text primary
    700: '#404040',  // Text emphasis
    800: '#262626',  // Text strong
    900: '#171717',  // Text heading
  },

  // Primary (use sparingly - only for key actions)
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',  // Primary action blue
    600: '#2563EB',  // Primary action blue hover
    700: '#1D4ED8',
  },

  // Status colors (minimal, clear)
  status: {
    success: '#10B981',      // Green
    successBg: '#ECFDF5',
    warning: '#F59E0B',      // Amber
    warningBg: '#FFFBEB',
    error: '#EF4444',        // Red
    errorBg: '#FEF2F2',
    info: '#3B82F6',         // Blue
    infoBg: '#EFF6FF',
  },

  // Background
  background: {
    page: '#FAFAFA',         // Main page background
    card: '#FFFFFF',         // Card/panel background
    elevated: '#FFFFFF',     // Modal/dropdown background
  },
};

// ============================================================
// SPACING - 8px Grid System
// ============================================================

export const spacing = {
  0: '0px',
  1: '4px',    // 0.5 * 8px
  2: '8px',    // 1 * 8px
  3: '12px',   // 1.5 * 8px (exception for compact layouts)
  4: '16px',   // 2 * 8px
  6: '24px',   // 3 * 8px
  8: '32px',   // 4 * 8px
  10: '40px',  // 5 * 8px
  12: '48px',  // 6 * 8px
  16: '64px',  // 8 * 8px
  20: '80px',  // 10 * 8px
  24: '96px',  // 12 * 8px
};

// ============================================================
// TYPOGRAPHY - Consistent Hierarchy
// ============================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
  },

  // Font sizes (consistent scale)
  fontSize: {
    xs: '11px',     // Captions, labels
    sm: '13px',     // Secondary text
    base: '14px',   // Body text (default)
    md: '15px',     // Body emphasis
    lg: '16px',     // Subheadings
    xl: '18px',     // Small headings
    '2xl': '20px',  // Card headings
    '3xl': '24px',  // Page headings
    '4xl': '28px',  // Main headings
    '5xl': '32px',  // Hero headings
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

// ============================================================
// BORDERS & SHADOWS - Minimal & Clean
// ============================================================

export const borders = {
  radius: {
    none: '0px',
    sm: '4px',      // Buttons, inputs
    md: '6px',      // Cards (use sparingly)
    lg: '8px',      // Modals
    full: '9999px', // Pills, avatars
  },

  width: {
    thin: '1px',    // Standard border (use 95% of time)
    medium: '2px',  // Focus states, emphasized borders
    thick: '3px',   // Rare - only for status indicators
  },
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',           // Subtle lift
  md: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',        // Standard elevation
  lg: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',        // Modal/dropdown
  xl: '0 10px 15px -3px rgba(0, 0, 0, 0.10)',      // High elevation (rare)
};

// ============================================================
// COMPONENT CLASSES - Reusable Patterns
// ============================================================

export const components = {
  // Cards
  card: {
    base: 'bg-white border border-neutral-200 rounded-md',
    interactive: 'hover:border-neutral-300 hover:shadow-sm transition-all duration-150',
    elevated: 'bg-white border border-neutral-200 shadow-md rounded-md',
  },

  // Buttons
  button: {
    primary: 'px-4 py-2 bg-primary-500 text-white rounded-sm font-medium hover:bg-primary-600 transition-colors',
    secondary: 'px-4 py-2 border border-neutral-300 text-neutral-700 bg-white rounded-sm font-medium hover:bg-neutral-50 transition-colors',
    ghost: 'px-4 py-2 text-neutral-700 rounded-sm font-medium hover:bg-neutral-100 transition-colors',
  },

  // Inputs
  input: {
    base: 'px-3 py-2 border border-neutral-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    error: 'border-error focus:ring-error',
  },

  // Tables
  table: {
    container: 'bg-white border border-neutral-200 rounded-md overflow-hidden',
    header: 'bg-neutral-50 border-b border-neutral-200',
    headerCell: 'px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider',
    row: 'border-b border-neutral-100 hover:bg-neutral-50 transition-colors',
    cell: 'px-4 py-3 text-sm text-neutral-900',
  },

  // Badges/Tags
  badge: {
    base: 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
    neutral: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary-50 text-primary-700',
    success: 'bg-status-successBg text-status-success',
    warning: 'bg-status-warningBg text-status-warning',
    error: 'bg-status-errorBg text-status-error',
  },

  // Status indicators
  statusDot: {
    base: 'w-2 h-2 rounded-full',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
    neutral: 'bg-neutral-400',
  },
};

// ============================================================
// LAYOUT - Grid & Spacing
// ============================================================

export const layout = {
  containerMaxWidth: '1440px',
  sidebarWidth: '240px',
  headerHeight: '56px',

  // Page padding (consistent across all pages)
  pagePadding: {
    x: spacing[6],  // 24px horizontal
    y: spacing[6],  // 24px vertical
  },

  // Gap between cards/sections
  sectionGap: spacing[6],  // 24px

  // Gap within cards
  cardGap: spacing[4],     // 16px
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Generate consistent spacing classes
 * @example getSpacing('p', 4) => 'p-4' (16px)
 */
export function getSpacing(property: 'p' | 'm' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr', value: keyof typeof spacing) {
  return `${property}-${value}`;
}

/**
 * Get status color based on value
 */
export function getStatusColor(status: 'success' | 'warning' | 'error' | 'info' | 'neutral') {
  const colorMap = {
    success: colors.status.success,
    warning: colors.status.warning,
    error: colors.status.error,
    info: colors.status.info,
    neutral: colors.neutral[500],
  };
  return colorMap[status];
}

/**
 * Get consistent text color classes
 */
export const textColors = {
  heading: 'text-neutral-900',
  body: 'text-neutral-700',
  secondary: 'text-neutral-500',
  muted: 'text-neutral-400',
};
