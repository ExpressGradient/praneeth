module.exports = {
    content: ["./app/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                serif: ["Lato", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
