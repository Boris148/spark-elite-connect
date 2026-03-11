import { useEffect, useRef } from "react";

export function TrulliEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.trulli.ai/embed.js";
    script.setAttribute("data-form-slug", "semgllc");
    script.setAttribute("data-widget", "form");
    script.async = true;

    containerRef.current?.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div id="trulli-marketplace" />
    </div>
  );
}
