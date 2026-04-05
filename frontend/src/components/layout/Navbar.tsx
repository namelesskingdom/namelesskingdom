import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AuthModal } from "../auth/AuthModal";
import { ProfileModal } from "../auth/ProfileModal";

export function Navbar() {
  const { member, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="relative z-20 border-b border-gold-900/20 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3">
            <span className="font-display text-gold-400 text-xl font-bold tracking-[0.3em] uppercase">
              NamelessKingdom
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#members">Members</NavLink>
            <NavLink href="#join">Join</NavLink>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {member ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setProfileOpen(true)}
                  className="flex items-center gap-2 text-sm text-neutral-300 hover:text-gold-400 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-gold-800/30 border border-gold-700/30 flex items-center justify-center font-display text-gold-400 text-xs font-bold">
                    {member.display_name[0].toUpperCase()}
                  </span>
                  <span className="hidden md:inline">{member.display_name}</span>
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-5 py-2 text-xs font-display font-semibold tracking-widest uppercase border border-gold-600/50 text-gold-400 hover:bg-gold-600/10 transition-colors rounded-sm cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-neutral-400 hover:text-gold-400 transition-colors uppercase tracking-wider font-display text-xs font-medium"
    >
      {children}
    </a>
  );
}
