import type { ReactNode } from "react";

const FLAGS: Record<string, string> = {
  it: "linear-gradient(90deg, #009246 33%, #fff 33% 66%, #ce2b37 66%)",
  en: "linear-gradient(180deg, #012169 33%, #fff 33% 66%, #C8102E 66%)",
  fr: "linear-gradient(90deg, #002395 33%, #fff 33% 66%, #ED2939 66%)",
  de: "linear-gradient(180deg, #000 33%, #DD0000 33% 66%, #FFCE00 66%)",
  es: "linear-gradient(180deg, #AA151B 25%, #F1BF00 25% 75%, #AA151B 75%)",
};

export function LangFlags({ langs }: { langs: (keyof typeof FLAGS)[] | string[] }) {
  return (
    <span className="cube-lang-flags">
      {langs.map((code) => (
        <span
          key={code}
          className="cube-lang-flag"
          title={code.toUpperCase()}
          style={{ background: FLAGS[code] ?? "#ccc" }}
        />
      ))}
    </span>
  );
}

export function Badge({
  variant = "neutral",
  children,
  dot = true,
}: {
  variant?: "success" | "info" | "warning" | "danger" | "neutral" | "brand";
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <span className={`cube-badge is-${variant}`}>
      {dot && <span className="cube-badge__dot" />}
      {children}
    </span>
  );
}
