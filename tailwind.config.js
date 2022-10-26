/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],

    theme: {
        colors: {
            "venice-blue": "#30547E",
            //orange: colors.orange,
            primary: colors.blue,
            secondary: colors.emerald,
            tertiary: colors.gray,
            danger: colors.red,
            "code-400": "#fefcf9",
            "code-600": "#3c455b",
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
