import { useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";

export function AuthModal({ onClose }: { onClose: () => void }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register(username, password, displayName || username, inviteCode);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#111] border border-gold-800/30 rounded w-full max-w-md p-8 mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-neutral-500 hover:text-neutral-300 transition-colors text-lg"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="font-display text-2xl font-bold text-gold-400 tracking-wider uppercase mb-6 text-center">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded px-4 py-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={30}
              className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
              placeholder="Your username"
            />
          </div>

          {mode === "register" && (
            <>
              <div>
                <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Invite Code</label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  required
                  className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors font-mono tracking-widest"
                  placeholder="Enter invite code"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={50}
                  className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
                  placeholder="Name shown to guild"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full cursor-pointer py-3 border-2 border-gold-500 text-gold-400 font-display font-semibold text-sm tracking-widest uppercase hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="cursor-pointer text-xs text-neutral-500 hover:text-gold-400 transition-colors"
          >
            {mode === "login" ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
