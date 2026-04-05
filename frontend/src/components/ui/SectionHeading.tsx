import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center mb-2">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-400 tracking-wide text-center uppercase">
        {children}
      </h2>
      <div className="mt-4 h-px w-24 bg-linear-to-r from-transparent via-gold-600 to-transparent" />
    </div>
  );
}
