import { SectionHeading } from "../ui/SectionHeading";
import { FeatureCard } from "../ui/FeatureCard";

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,154,26,0.02)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading>Our Creed</SectionHeading>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          <FeatureCard
            icon="⚔️"
            title="Strength"
            description="We sharpen our skills relentlessly. On the battlefield, weakness is not an option. Every member is expected to push their limits."
          />
          <FeatureCard
            icon="🛡️"
            title="Loyalty"
            description="We stand by each other — in sieges, in grind, and beyond the game. The Kingdom is family."
          />
          <FeatureCard
            icon="👑"
            title="Honor"
            description="We fight with integrity. Victory means nothing without respect. Our reputation precedes us."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <FeatureCard
            icon="🏰"
            title="Node Wars"
            description="Organized siege warfare with strategic coordination. We conquer and defend with precision."
          />
          <FeatureCard
            icon="🐉"
            title="World Bosses"
            description="Never miss a spawn. Our members rally together to take down every world boss."
          />
          <FeatureCard
            icon="🤝"
            title="Community"
            description="Active Discord, scheduled events, gear advice, and mentorship for newer members."
          />
        </div>
      </div>
    </section>
  );
}
