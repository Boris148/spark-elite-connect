import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        elite: {
          black: "#0a0a0a",
          gold: "#057ec1",
          "gold-dark": "#045a8d",
          "gold-soft": "#35a6db",
          slate: "#111111",
          line: "rgba(5, 126, 193, 0.15)",
        },
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(5,126,193,0.18), 0 18px 60px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #057ec1 0%, #35a6db 55%, #045a8d 100%)",
        "hero-radial":
          "radial-gradient(circle at 15% 15%, rgba(5,126,193,.14), transparent 40%), radial-gradient(circle at 85% 5%, rgba(5,126,193,.08), transparent 35%), radial-gradient(circle at 50% 100%, rgba(5,126,193,.05), transparent 60%)",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp .7s ease-out both",
        shimmer: "shimmer 2.8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
