/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                beige: {
                    100: '#FAF0E6', // Linen
                    200: '#F5E6D3', // Warm Beige
                    300: '#E6D2B5', // Darker Beige
                },
                wood: {
                    100: '#DEB887', // Burlywood
                    200: '#CD853F', // Peru
                    300: '#8B4513', // SaddleBrown
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
