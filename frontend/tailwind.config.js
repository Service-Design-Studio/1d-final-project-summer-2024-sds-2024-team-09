/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",


    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ], theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", {
      mytheme: {
        "primary": "#405D72",
        "primary-content": "#3F5F90",
        "secondary": "#F6D776",
        "secondary-content": "#EDDBCE",
        "accent": "#e68369",
        "neutral": "#f7e7dc",
        "base-100": "#fff8f3",
        "info": "#758694",
        "success": "#bef264",
        "warning": "#fde047",
        "error": "#eb3223",
      }
    }], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

