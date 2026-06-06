/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        primary: '#06B6D4',
        accent: '#8B5CF6',
        muted: '#64748B',
        text: '#F1F5F9',
      }
    },
  },
  plugins: [],
}