import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        twofold: {
          cream: '#fffce1',
          dark: '#0e100f', 
          accent: '#7c7c6f'
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [animate, typography]
} satisfies Config;
