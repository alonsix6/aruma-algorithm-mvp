/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aruma Brand Colors
        aruma: {
          pink: '#FF006B',      // Rosa vibrante principal
          magenta: '#E1006F',   // Magenta oscuro
          purple: '#764BA2',    // Púrpura
          blue: '#667EEA',      // Azul
          light: '#FFE5F0',     // Rosa claro
          dark: '#2D0F3D',      // Oscuro
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-aruma': 'linear-gradient(135deg, #FF006B 0%, #764BA2 100%)',
        'gradient-aruma-light': 'linear-gradient(135deg, #FFE5F0 0%, #E1D5F8 100%)',
      },
      boxShadow: {
        'aruma': '0 20px 50px rgba(255, 0, 107, 0.15)',
        'aruma-lg': '0 30px 60px rgba(255, 0, 107, 0.25)',
      },
    },
  },
  plugins: [],
}