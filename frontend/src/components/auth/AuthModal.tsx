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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative flex w-full max-w-md flex-col gap-6 rounded border border-gold-800/30 bg-[#111] p-8"
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
        <h2 className="text-center font-display text-2xl font-bold tracking-wider text-gold-400 uppercase">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h2>

        {error && (
          <div className="rounded border border-red-800/30 bg-red-900/20 px-4 py-2 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Username</label>
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
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Invite Code</label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  required
                  className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors font-mono tracking-widest"
                  placeholder="Enter invite code"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Display Name</label>
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

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Password</label>
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
            className="w-full cursor-pointer rounded-sm border-2 border-gold-500 py-3 font-display text-sm font-semibold tracking-widest text-gold-400 uppercase transition-all duration-300 hover:bg-gold-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center">
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
