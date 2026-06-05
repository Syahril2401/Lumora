import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'DM Sans', ...defaultTheme.fontFamily.sans],
                display: ['Satoshi', 'DM Sans', ...defaultTheme.fontFamily.sans],
                mono: ['JetBrains Mono', 'monospace', ...defaultTheme.fontFamily.mono],
            },
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
                accent: {
                    teal: '#0D9488',
                    orange: '#EA580C',
                    rose: '#E11D48',
                    sky: '#0284C7',
                    emerald: '#059669',
                },
                brand: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316',
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12'
                },
                navy: {
                    50: '#F0F4F8',
                    100: '#D9E2EC',
                    200: '#BCCCDC',
                    300: '#9FB3C8',
                    400: '#829AB1',
                    500: '#627D98',
                    600: '#486581',
                    700: '#334E68',
                    800: '#243B53',
                    900: '#102A43'
                },
                text: {
                    primary: '#F0F4F8',
                    secondary: '#BCCCDC',
                    muted: '#829AB1',
                    faint: '#627D98',
                },
                dark: {
                    bg: '#0C1222',
                    panel: '#111827',
                    surface: '#1E293B',
                    border: 'rgba(255,255,255,0.05)',
                }
            },
            borderRadius: {
                '2xl': '16px',
                '3xl': '20px',
                '4xl': '24px',
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                'card-hover': '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.03)',
                'popover': '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)',
                'sidebar': '1px 0 0 0 #E5E7EB',
                'glow': '0 0 40px rgba(249,115,22,0.10)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%,100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' }
                },
            },
        },
    },

    plugins: [forms],
};
