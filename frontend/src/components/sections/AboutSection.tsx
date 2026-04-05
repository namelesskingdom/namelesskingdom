import { SectionHeading } from "../ui/SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="relative py-28">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 bg-[#0c0c0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,154,26,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeading>Who We Are</SectionHeading>
        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-neutral-400 leading-relaxed mb-6">
              <span className="font-display text-gold-400 font-semibold">NamelessKingdom</span> is
              a brotherhood of warriors united under one banner in the world of Black Desert Online.
              We stand for strength in unity, honor in battle, and loyalty to our kin.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              From Node Wars to world bosses, from endless grind sessions to late-night sieges —
              we leave our mark on every battlefield. Our kingdom has no name, yet everyone knows
              who we are.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatBlock label="Founded" value="2024" />
            <StatBlock label="Region" value="NA/EU" />
            <StatBlock label="Focus" value="PvP / PvE" />
            <StatBlock label="Spirit" value="Competitive" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 border border-gold-800/15 rounded bg-[#0e0e0e] text-center">
      <p className="font-display text-gold-400 text-xl font-bold">{value}</p>
      <p className="text-neutral-500 text-[11px] uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}
