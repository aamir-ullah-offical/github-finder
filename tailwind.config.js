/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        lava: {
          "0%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        pulseOnce: {
          "0%, 80%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0, transform: "scale(.8)" },
            "100%": { opacity: 1, transform: "scale(1)" },
          },
        },
        animation: {
          fadeIn: "fadeIn 2s ease-out",
        },
      },
      animation: {
        lava: "lava 12s ease infinite",
        pulseOnce: "pulseOnce 2s ease 1",
      },
      fontFamily: {
        arvo: ['"Arvo"', 'serif'],
      },
    },
  },
  plugins: [],
};
