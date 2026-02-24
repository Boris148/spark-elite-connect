export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                elite: {
                    black: "#0a0a0a",
                    gold: "#D4AF37",
                    "gold-dark": "#9f7f19",
                    "gold-soft": "#f3dc8a",
                    slate: "#111111",
                    line: "rgba(212, 175, 55, 0.15)",
                },
            },
            boxShadow: {
                gold: "0 0 0 1px rgba(212,175,55,0.18), 0 18px 60px rgba(0,0,0,0.45)",
            },
            backgroundImage: {
                "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F2D675 55%, #B78E20 100%)",
                "hero-radial": "radial-gradient(circle at 15% 15%, rgba(212,175,55,.14), transparent 40%), radial-gradient(circle at 85% 5%, rgba(212,175,55,.08), transparent 35%), radial-gradient(circle at 50% 100%, rgba(212,175,55,.05), transparent 60%)",
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
};
