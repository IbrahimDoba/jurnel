import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(160 85% 87%)',
        accent: 'hsl(160 84% 39%)',
        secondary: 'hsl(204, 86%, 53%)',
        txt: 'hsl(209, 61%, 16%)',
        error: 'hsl(354 84% 57%)',
        main: 'hsl(153, 69%, 97%)',
      },
      screens: {
        'max-lg': { max: '1000px' },
        'max-md': { max: '680px' },
        md: '681px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
