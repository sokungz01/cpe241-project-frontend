/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "#003150",
        clike: "#0174BE",
        normal: "#3490CB",
        primary: "#1890FF",
        bg: "#E6F1F9",
        blue_header: "#003150",
        success: "#52C41A",
        danger: "#FF4D4F",
        unavailable: "#808080",
      },
    },
  },
  plugins: [],
};
