// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,tsx,jsx,ts}",
//     "./src/pages/**/*.{js,ts,jsx,tsx}",
//     "./src/components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         "bg-primary": "#fff9f9",

//         // text colors
//         "text-primary": "#96479c",
//       },
//     },
//   },
//   plugins: [],
// };

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
        },
        // Text colors
        text: {
          primary: "#7B1984",
          secondary: "#000000",
          tertiary: "#231F20D1",
        },
        // Border colors
        border: {
          light: "#7B198426",
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }],
        sm: ["11.64px", { lineHeight: "1.018rem", fontWeight: "400" }],
        base: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        lg: ["  1.364rem", { lineHeight: "1.909", fontWeight: "500" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        xxl: ["1.5rem", { lineHeight: "2.1rem", fontWeight: "600" }],

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
        full: "9999px",
      },
      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        default:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        none: "none",
      },
    },
  },
  plugins: [],
};
