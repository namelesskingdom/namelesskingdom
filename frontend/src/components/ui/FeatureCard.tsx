export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative p-8 rounded border border-gold-800/20 bg-[#111]/80 backdrop-blur-sm hover:border-gold-600/40 transition-all duration-300">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-gold-400 mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
      <div className="absolute inset-0 rounded bg-gold-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
