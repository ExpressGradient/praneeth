/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.jsx", "./shared/**/*.jsx"],
    theme: {
        extend: {
            fontFamily: {
                serif: ["IBM Plex Sans", "sans-serif"],
                mono: ["Source Code Pro", "monospace"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
