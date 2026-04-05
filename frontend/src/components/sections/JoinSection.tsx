import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AuthModal } from "../auth/AuthModal";

export function JoinSection() {
  const { member } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section id="join" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-gold-500/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-700/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-400 tracking-wider uppercase">
            Ready to Join<br />the Kingdom?
          </h2>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="block h-px w-12 bg-linear-to-r from-transparent to-gold-600/60" />
            <svg className="w-3 h-3 text-gold-600" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5L8 13l-5 3 1-5.5-4-4 5.5-1z" />
            </svg>
            <span className="block h-px w-12 bg-linear-to-l from-transparent to-gold-600/60" />
          </div>

          <p className="mt-8 text-neutral-400 max-w-lg mx-auto leading-relaxed">
            We're always looking for dedicated adventurers who want to be part of something
            legendary. Create your profile and show the Kingdom who you are.
          </p>

          {member ? (
            <div className="mt-10">
              <p className="text-gold-400 font-display tracking-wider">
                Welcome, <span className="font-bold">{member.display_name}</span>
              </p>
              <p className="text-neutral-500 text-sm mt-2">
                You're part of the Kingdom. Edit your profile from the navbar.
              </p>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="mt-10 inline-block px-12 py-4 border-2 border-gold-500 text-gold-400 font-display font-semibold tracking-[0.3em] uppercase text-sm hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-sm cursor-pointer"
            >
              Create Your Profile
            </button>
          )}
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-700/30 to-transparent" />
      </section>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
