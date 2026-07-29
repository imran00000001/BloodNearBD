const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Fraunces", "serif"],
                sans: ["Manrope", "sans-serif"],
            },
            colors: {
                wine: {
                    DEFAULT: "#7A1128",
                    light: "#A32638",
                    dark: "#4A0A18",
                },
                amber: {
                    DEFAULT: "#E8A33D",
                },
                ivory: "#FFF8F0",
            },
        },
    },
    plugins: [],
});