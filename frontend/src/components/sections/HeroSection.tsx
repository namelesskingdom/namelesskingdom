export function HeroSection() {
  return (
    <header className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-28 text-center sm:px-6 sm:pt-24 sm:pb-36">
      {/* ── Background treatment ── */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-3xl sm:h-144 sm:w-xl" />
      {/* Top vignette */}
      <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
        {/* Logo placeholder */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold-700/30 bg-[#111] shadow-[0_0_80px_rgba(196,154,26,0.06)] sm:h-44 sm:w-44">
          <span className="font-display text-4xl font-bold tracking-wider text-gold-400 sm:text-5xl">NK</span>
        </div>

        <h1 className="font-display flex flex-col text-4xl font-bold tracking-[0.08em] text-gold-400 drop-shadow-[0_0_40px_rgba(196,154,26,0.2)] sm:text-5xl sm:tracking-[0.12em] md:text-7xl lg:flex-row lg:justify-center lg:gap-[0.15em] lg:text-8xl lg:tracking-[0.15em]">
          <span>Nameless</span>
          <span>Kingdom</span>
        </h1>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="block h-px w-8 bg-linear-to-r from-transparent to-gold-600/60 sm:w-20" />
          <span className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-600/80 sm:text-xs sm:tracking-[0.4em]">
            Black Desert Online
          </span>
          <span className="block h-px w-8 bg-linear-to-l from-transparent to-gold-600/60 sm:w-20" />
        </div>

        <p className="max-w-2xl px-2 text-base leading-relaxed font-light text-neutral-400 sm:text-lg md:text-xl">
          An elite guild forging legends on the sands of Black Desert Online.
          United we stand — in Node Wars, world bosses, and beyond.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#join"
            className="w-full max-w-xs rounded-sm border-2 border-gold-500 px-6 py-3.5 text-center font-display text-[11px] font-semibold tracking-[0.22em] text-gold-400 uppercase transition-all duration-300 hover:bg-gold-500 hover:text-black sm:w-auto sm:px-10 sm:text-xs sm:tracking-[0.3em]"
          >
            Join the Kingdom
          </a>
          <a
            href="#about"
            className="font-display text-xs tracking-[0.16em] text-neutral-400 uppercase transition-colors hover:text-gold-400 sm:tracking-[0.2em]"
          >
            Learn More &darr;
          </a>
        </div>
      </div>

      {/* ── Decorative bottom border ── */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-px bg-linear-to-r from-transparent via-gold-700/40 to-transparent" />
      </div>
    </header>
  );
}
