/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        medical: {
          bg: {
            primary: '#0A1628',
            secondary: '#0F1E36',
            tertiary: '#142947',
          },
          accent: {
            cyan: '#00BCD4',
            blue: '#1E88E5',
            orange: '#FF5722',
            purple: '#9C27B0',
          }
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      }
    },
  },
  plugins: [],
};
