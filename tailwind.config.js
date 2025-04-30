/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}"
    ],
    theme: {
      extend: {
        colors: {
          primary:    '#2D6A4F',
          accent:     '#A7D129',
          dark:       '#1B4332',
          sand:       '#D3C59D',
          light:      '#F9F9F9',
          charcoal:   '#212121',
        }
      }
    },
    plugins: [],
  }
  