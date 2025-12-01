/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Source Sans Pro', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        accent: {
          DEFAULT: '#dc2626',
          light: '#ef4444',
          dark: '#b91c1c',
        },
        paper: {
          DEFAULT: '#fffbf5',
          dark: '#f5f0e8',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: '#292524',
            a: {
              color: '#dc2626',
              '&:hover': {
                color: '#b91c1c',
              },
            },
            h1: {
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#dc2626',
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
