declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                elite: {
                    black: string;
                    gold: string;
                    "gold-dark": string;
                    "gold-soft": string;
                    slate: string;
                    line: string;
                };
            };
            boxShadow: {
                gold: string;
            };
            backgroundImage: {
                "gold-gradient": string;
                "hero-radial": string;
            };
            fontFamily: {
                display: [string, string, string, string];
                body: [string, string, string, string];
            };
            animation: {
                "fade-up": string;
                shimmer: string;
            };
            keyframes: {
                fadeUp: {
                    "0%": {
                        opacity: string;
                        transform: string;
                    };
                    "100%": {
                        opacity: string;
                        transform: string;
                    };
                };
                shimmer: {
                    "0%": {
                        backgroundPosition: string;
                    };
                    "100%": {
                        backgroundPosition: string;
                    };
                };
            };
        };
    };
    plugins: never[];
};
export default _default;
