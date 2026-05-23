/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lumora: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3',
          800: '#312E81',
          900: '#1E1B4B',
        },
        surface: {
          DEFAULT: '#F5F7FA',
          warm: '#F8FAFC',
          card: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          faint: '#D1D5DB',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
};
