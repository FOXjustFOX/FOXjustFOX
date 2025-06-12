/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#646cff",
                "primary-hover": "#535bf2",
                dark: "#1a1a1a",
                "dark-secondary": "#242424",
                "dark-tertiary": "#2a2a2a",
                secondary: "#fdfdfd",
                tertiary: "#447cff",
                "gray-custom": {
                    100: "#f8f9fa",
                    200: "#e9ecef",
                    300: "#dee2e6",
                    400: "#ced4da",
                    500: "#adb5bd",
                    600: "#6c757d",
                    700: "#495057",
                    800: "#343a40",
                    900: "#212529",
                },
            },
            fontFamily: {
                sans: [
                    "system-ui",
                    "Avenir",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                ],
            },
            backgroundImage: {
                "gradient-primary":
                    "linear-gradient(135deg, #646cff 0%, #8c84ff 100%)",
            },
            animation: {
                "spin-slow": "spin 2s linear infinite",
                "pulse-slow": "pulse 1.5s ease-in-out infinite",
            },
            typography: {
                invert: {
                    css: {
                        "--tw-prose-body": "rgb(229 231 235)",
                        "--tw-prose-headings": "rgb(243 244 246)",
                        "--tw-prose-lead": "rgb(156 163 175)",
                        "--tw-prose-links": "#646cff",
                        "--tw-prose-bold": "rgb(243 244 246)",
                        "--tw-prose-counters": "rgb(156 163 175)",
                        "--tw-prose-bullets": "rgb(75 85 99)",
                        "--tw-prose-hr": "rgb(55 65 81)",
                        "--tw-prose-quotes": "rgb(243 244 246)",
                        "--tw-prose-quote-borders": "rgb(55 65 81)",
                        "--tw-prose-captions": "rgb(156 163 175)",
                        "--tw-prose-code": "rgb(243 244 246)",
                        "--tw-prose-pre-code": "rgb(229 231 235)",
                        "--tw-prose-pre-bg": "rgb(31 41 55)",
                        "--tw-prose-th-borders": "rgb(55 65 81)",
                        "--tw-prose-td-borders": "rgb(75 85 99)",
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/typography")],
};
