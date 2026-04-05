export function HeroSection() {
  return (
    <header className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-36 overflow-hidden">
      {/* ── Background treatment ── */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      {/* Top vignette */}
      <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Logo placeholder */}
        <div className="mx-auto w-44 h-44 mb-10 rounded-full border-2 border-gold-700/30 flex items-center justify-center bg-[#111] shadow-[0_0_80px_rgba(196,154,26,0.06)]">
          <span className="font-display text-gold-400 text-5xl font-bold tracking-wider">NK</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-gold-400 drop-shadow-[0_0_40px_rgba(196,154,26,0.2)]">
          NamelessKingdom
        </h1>

        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="block h-px w-20 bg-linear-to-r from-transparent to-gold-600/60" />
          <span className="font-display text-gold-600/80 text-xs tracking-[0.4em] uppercase">
            Black Desert Online
          </span>
          <span className="block h-px w-20 bg-linear-to-l from-transparent to-gold-600/60" />
        </div>

        <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          An elite guild forging legends on the sands of Black Desert Online.
          United we stand — in Node Wars, world bosses, and beyond.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href="#join"
            className="px-10 py-3.5 border-2 border-gold-500 text-gold-400 font-display font-semibold text-xs tracking-[0.3em] uppercase hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-sm"
          >
            Join the Kingdom
          </a>
          <a
            href="#about"
            className="text-neutral-400 hover:text-gold-400 transition-colors font-display text-xs tracking-[0.2em] uppercase"
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
