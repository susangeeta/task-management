/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,tsx,jsx,ts}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          primary: "#fff9f9",
          secondary: "#292929",
          "logout-color": "#FFF9F9  ",
          "todo-color": "#FAC3FF",
          "todo-bg": "#F1F1F1",
          "title-color": "#000000",
          "button-color": "#DDDADD",
          "inprogress-bg": "#85D9F1",
          "completed-bg": "#CEFFCC",
          lightPink: "#fff9f9",
          "light-gray": "#fafafa",
          "custom-bg": "#f1f1f1",
          "custom-black": "#1A1C20",
        },
        // Text colors
        text: {
          primary: "#7B1984",
          secondary: "#000000",
          tertiary: "#231F20D1",
          dark: "#00000099",
          "custom-red": "#DA2F2F",
          "custom-gray": "#2F2F2F",
          "deep-blue": "#1E212A",
          "custom-text": "#767676",
          "custom-dark": "#090909",
          "custom-light-pink": "#FAEEFC",
          "custom-blue": "#2683B5",
        },
        // Border colors
        border: {
          light: "#7B198426",
          "custom-purple": "#7B19841F",
          "custom-gray-opaque": "#58575112",
        },
      },
      fontSize: {
        xs: ["0.875rem.", { lineHeight: "1.225rem", fontWeight: "500" }],
        sm: ["11.64px", { lineHeight: "1.018rem", fontWeight: "400" }],
        base: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        lg: ["  1.364rem", { lineHeight: "1.909", fontWeight: "500" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        xxl: ["1.5rem", { lineHeight: "2.1rem", fontWeight: "600" }],
        xxxl: ["0.75rem", { lineHeight: "1.05rem" }],

        "2xl": ["1.637rem", { lineHeight: "2.291rem", fontWeight: "600" }],

        "3xl": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        default: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1.182rem",
        xxl: "60px",
        full: "9999px",
        xxl: "20px",
        xxxl: "41px",
      },
    },
  },
  plugins: [],
};
