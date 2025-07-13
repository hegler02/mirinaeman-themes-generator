/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['var(--font-primary)', 'system-ui', 'sans-serif'],
        'title': ['var(--font-title)', 'system-ui', 'sans-serif'],
        'mono': ['Menlo', 'Consolas', 'Monaco', 'Liberation Mono', 'Lucida Console', 'monospace']
      },
      colors: {
        // 테마 색상을 CSS 변수로 정의
        'theme-primary': 'var(--theme-text-primary)',
        'theme-secondary': 'var(--theme-text-secondary)',
        'theme-tertiary': 'var(--theme-text-tertiary)',
        'theme-accent': 'var(--theme-accent-primary)',
        'theme-body-bg': 'var(--theme-body-bg)',
        'theme-section-bg': 'var(--theme-section-bg)',
        'theme-card-bg': 'var(--theme-card-bg)',
        'theme-border-light': 'var(--theme-border-light)',
        'theme-border-medium': 'var(--theme-border-medium)',
      },
      spacing: {
        'theme-xs': 'var(--space-xs)',
        'theme-sm': 'var(--space-sm)',
        'theme-md': 'var(--space-md)',
        'theme-lg': 'var(--space-lg)',
        'theme-xl': 'var(--space-xl)',
        'theme-2xl': 'var(--space-2xl)',
        'theme-3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        'theme-sm': 'var(--radius-sm)',
        'theme-md': 'var(--radius-md)',
        'theme-lg': 'var(--radius-lg)',
        'theme-xl': 'var(--radius-xl)',
        'theme-2xl': 'var(--radius-2xl)',
        'theme-full': 'var(--radius-full)',
      },
      boxShadow: {
        'theme-soft': 'var(--theme-shadow-soft)',
        'theme-medium': 'var(--theme-shadow-medium)',
        'theme-strong': 'var(--theme-shadow-strong)',
      }
    },
  },
  plugins: [],
  // 프로덕션 빌드 시 사용되지 않는 CSS 제거 (v3.0 방식)
  safelist: [
    // 동적으로 생성되는 클래스들 보호
    {
      pattern: /^(alert|badge|btn|nav|card|input|modal|tab|accordion|table|form|text|bg|border|link|placeholder|rounded|title-font)-/,
      variants: ['hover', 'focus', 'active', 'disabled', 'checked', 'selected', 'invalid', 'valid', 'first', 'last', 'odd', 'even', 'before', 'after', 'sm', 'md', 'lg', 'xl', '2xl', 'dark', 'light']
    },
    {
      pattern: /^(transition|duration|ease|animate)-/,
      variants: ['hover', 'focus', 'active']
    },
    {
      pattern: /^(w|h|min-h|max-w|max-h|flex|items|justify|space|p|px|py|m|mx|my|mt|mb|ml|mr)-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    // 자주 사용되는 유틸리티 클래스들
    'w-full',
    'h-full',
    'min-h-screen',
    'flex',
    'flex-col',
    'flex-row',
    'items-center',
    'justify-center',
    'justify-between',
    'space-x-2',
    'space-x-3',
    'space-x-4',
    'space-y-2',
    'space-y-3',
    'space-y-4',
    'space-y-6',
    'p-2',
    'p-3',
    'p-4',
    'p-6',
    'px-2',
    'px-3',
    'px-4',
    'px-6',
    'py-2',
    'py-3',
    'py-4',
    'py-6',
    'm-2',
    'm-3',
    'm-4',
    'm-6',
    'mx-2',
    'mx-3',
    'mx-4',
    'mx-6',
    'my-2',
    'my-3',
    'my-4',
    'my-6',
    'mt-2',
    'mt-3',
    'mt-4',
    'mt-6',
    'mb-2',
    'mb-3',
    'mb-4',
    'mb-6',
    'ml-2',
    'ml-3',
    'ml-4',
    'ml-6',
    'mr-2',
    'mr-3',
    'mr-4',
    'mr-6'
  ]
} 