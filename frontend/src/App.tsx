function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* ── Decorative top gold line ── */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-gold-400 to-transparent" />

      {/* ── Navigation ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <span className="font-display text-gold-400 text-xl font-semibold tracking-widest uppercase">
          NK
        </span>
        <div className="flex gap-8 font-body text-sm tracking-wide text-neutral-400">
          <a href="#about" className="hover:text-gold-400 transition-colors">About</a>
          <a href="#values" className="hover:text-gold-400 transition-colors">Values</a>
          <a href="#members" className="hover:text-gold-400 transition-colors">Members</a>
          <a href="#join" className="hover:text-gold-400 transition-colors">Join Us</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        {/* Radial glow behind logo area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

        {/* Logo placeholder */}
        <div className="relative w-40 h-40 mb-10 rounded-full border-2 border-gold-700/40 flex items-center justify-center bg-[#111] shadow-[0_0_60px_rgba(196,154,26,0.08)]">
          <span className="font-display text-gold-400 text-5xl font-bold">NK</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-wider text-gold-400 drop-shadow-[0_0_30px_rgba(196,154,26,0.25)]">
          NamelessKingdom
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-400 max-w-xl font-light tracking-wide">
          An elite guild forging legends on the sands of Black Desert Online
        </p>

        {/* Decorative divider */}
        <div className="mt-10 flex items-center gap-4">
          <span className="block h-px w-16 bg-linear-to-r from-transparent to-gold-600" />
          <svg className="w-4 h-4 text-gold-500" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5L8 13l-5 3 1-5.5-4-4 5.5-1z" />
          </svg>
          <span className="block h-px w-16 bg-linear-to-l from-transparent to-gold-600" />
        </div>
      </header>

      {/* ── About Section ── */}
      <section id="about" className="relative max-w-5xl mx-auto px-6 py-24">
        <SectionHeading>Who We Are</SectionHeading>
        <p className="text-center text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          NamelessKingdom is a brotherhood of warriors united under one banner in the world of
          Black Desert Online. We stand for strength in unity, honor in battle, and loyalty to
          our kin. From Node Wars to world bosses, we leave our mark on every battlefield.
        </p>
      </section>

      {/* ── Values Section ── */}
      <section id="values" className="relative max-w-6xl mx-auto px-6 py-24">
        <SectionHeading>Our Creed</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <ValueCard icon="⚔️" title="Strength" description="We sharpen our skills relentlessly. On the battlefield, weakness is not an option." />
          <ValueCard icon="🛡️" title="Loyalty" description="We stand by each other — in sieges, in grind, and beyond the game." />
          <ValueCard icon="👑" title="Honor" description="We fight with integrity. Victory means nothing without respect." />
        </div>
      </section>

      {/* ── Members Preview ── */}
      <section id="members" className="relative max-w-5xl mx-auto px-6 py-24">
        <SectionHeading>The Kingdom</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {["Guild Master", "Officer", "Officer", "Member"].map((role, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-gold-800/20 bg-[#111]/60 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-full bg-gold-900/30 border border-gold-700/30 flex items-center justify-center text-gold-400 text-xl font-display font-bold">
                ?
              </div>
              <span className="text-sm text-neutral-400">{role}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-neutral-500 text-sm mt-8">
          + many more warriors stand with us
        </p>
      </section>

      {/* ── Join CTA ── */}
      <section id="join" className="relative max-w-3xl mx-auto px-6 py-32 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-400 tracking-wide mb-6">
          Ready to Join the Kingdom?
        </h2>
        <p className="text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
          We're always looking for dedicated adventurers who want to be part of something
          legendary. If you have what it takes, reach out to us.
        </p>
        <a
          href="#"
          className="inline-block px-10 py-4 border-2 border-gold-500 text-gold-400 font-display font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-sm"
        >
          Apply Now
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gold-900/30 py-10 text-center">
        <span className="font-display text-gold-600/60 text-sm tracking-widest uppercase">
          NamelessKingdom
        </span>
        <p className="text-neutral-600 text-xs mt-2">
          Black Desert Online © Pearl Abyss. We are a fan community.
        </p>
      </footer>

      {/* ── Bottom gold line ── */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-gold-400 to-transparent" />
    </div>
  );
}

/* ── Reusable Components ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center mb-2">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-400 tracking-wide text-center">
        {children}
      </h2>
      <div className="mt-4 h-px w-24 bg-linear-to-r from-transparent via-gold-600 to-transparent" />
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative p-8 rounded-xl border border-gold-800/20 bg-[#111]/60 backdrop-blur-sm hover:border-gold-600/40 transition-colors duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-gold-400 mb-3">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl bg-gold-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default App;
