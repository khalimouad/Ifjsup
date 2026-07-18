import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "dark";
}) {
  const tones = {
    white: "bg-paper",
    mist: "bg-mist",
    dark: "bg-primary-950 text-white",
  };
  return (
    <section className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">{children}</div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  text,
  dark = false,
}: {
  kicker?: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal max-w-2xl">
      {kicker && (
        <p className={`font-display text-sm font-bold uppercase tracking-widest ${dark ? "text-accent-400" : "text-accent-600"}`}>
          {kicker}
        </p>
      )}
      <h2 className={`mt-2 font-display text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-primary-900"}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/75" : "text-ink/70"}`}>{text}</p>}
    </div>
  );
}
