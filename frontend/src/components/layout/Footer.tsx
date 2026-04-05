export function Footer() {
  return (
    <footer className="border-t border-gold-900/20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-gold-500/60 text-sm tracking-[0.3em] uppercase font-semibold">
              NamelessKingdom
            </span>
            <p className="text-neutral-600 text-xs mt-1">
              A Black Desert Online guild community
            </p>
          </div>
          <div className="flex gap-6 text-xs text-neutral-500">
            <a href="#about" className="hover:text-gold-400 transition-colors">About</a>
            <a href="#members" className="hover:text-gold-400 transition-colors">Members</a>
            <a href="#join" className="hover:text-gold-400 transition-colors">Join</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-800/50 text-center">
          <p className="text-neutral-700 text-[10px] uppercase tracking-wider">
            Black Desert Online &copy; Pearl Abyss Corp. We are a fan community — not affiliated with Pearl Abyss.
          </p>
        </div>
      </div>
    </footer>
  );
}
