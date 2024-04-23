/** @type {import('tailwindcss').Config} */

import tailwindcssDebugScreens from 'tailwindcss-debug-screens'
import tailwindcssTypography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    debugScreens: {
      position: ['bottom', 'left'],
      style: {},
    },
    extend: {},
  },
  plugins: [
    tailwindcssDebugScreens,
    tailwindcssTypography,
  ],
}

