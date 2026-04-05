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
        <div className="flex justify-center px-4 py-4 sm:px-6 md:px-10">
          <div className="flex w-full max-w-7xl items-center justify-between gap-3">
          {/* Brand */}
            <a href="#" className="min-w-0 flex items-center gap-3">
              <span className="font-display text-sm font-bold tracking-[0.16em] text-gold-400 uppercase sm:text-base sm:tracking-[0.24em] md:text-xl md:tracking-[0.3em]">
                <span className="sm:hidden">NK</span>
                <span className="hidden sm:inline">NamelessKingdom</span>
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
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              {member ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setProfileOpen(true)}
                    className="flex min-w-0 items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-gold-400"
                  >
                    <span className="w-7 h-7 rounded-full bg-gold-800/30 border border-gold-700/30 flex items-center justify-center font-display text-gold-400 text-xs font-bold">
                      {member.display_name[0].toUpperCase()}
                    </span>
                    <span className="hidden max-w-32 truncate md:inline">{member.display_name}</span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-[11px] text-neutral-500 uppercase tracking-wider transition-colors hover:text-neutral-300 sm:text-xs"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="cursor-pointer rounded-sm border border-gold-600/50 px-3 py-2 font-display text-[11px] font-semibold tracking-[0.18em] text-gold-400 uppercase transition-colors hover:bg-gold-600/10 sm:px-5 sm:text-xs sm:tracking-widest"
                >
                  Login
                </button>
              )}
            </div>
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
