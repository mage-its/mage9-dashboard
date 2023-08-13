/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                custom: {
                    bg: '#03001C',
                    purple: {
                        dark: '#301E67',
                        DEFAULT: '#3D2585',
                    },
                    blue: {
                        dark: '#35546e',
                        DEFAULT: '#5B8FB9',
                    },
                    grey: '#1F2937',
                },
            },
            backgroundImage: {
                mage: "url('/assets/images/bg/dashboard-background.png')",
            },
            fontFamily: {
                airstrike: ['var(--font-airstrike)'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
