/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(174, 55%, 45%)',
        background: 'hsl(200, 20%, 10%)',
        card: 'hsl(200, 20%, 13%)',
        sidebar: 'hsl(200, 28%, 7%)',
        muted: 'hsl(200, 14%, 16%)',
        destructive: 'hsl(0, 62%, 45%)',
        success: 'hsl(152, 55%, 45%)',
        warning: 'hsl(38, 85%, 50%)',
        info: 'hsl(200, 70%, 52%)',
        border: 'hsl(200, 14%, 20%)',
        foreground: 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
}
