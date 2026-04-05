import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import { queryKeys } from "../../lib/queryKeys";
import type { Invite } from "../../types";

const BDO_CLASSES = [
  "Warrior", "Ranger", "Sorceress", "Berserker", "Tamer",
  "Musa", "Maehwa", "Valkyrie", "Kunoichi", "Ninja",
  "Wizard", "Witch", "Dark Knight", "Striker", "Mystic",
  "Lahn", "Archer", "Shai", "Guardian", "Hashashin",
  "Nova", "Sage", "Corsair", "Drakania", "Woosa", "Maegu", "Scholar",
];

export function ProfileModal({ onClose }: { onClose: () => void }) {
  const { member, updateProfile } = useAuth();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState(member?.display_name ?? "");
  const [characterClass, setCharacterClass] = useState(member?.character_class ?? "");
  const [level, setLevel] = useState(member?.level?.toString() ?? "");
  const [gearScore, setGearScore] = useState(member?.gear_score?.toString() ?? "");
  const [bio, setBio] = useState(member?.bio ?? "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const { data: invitesData } = useQuery({
    queryKey: queryKeys.invites(member?.id ?? null),
    queryFn: () => api.getMyInvites(member!.id),
    enabled: Boolean(member),
  });

  const generateInviteMutation = useMutation({
    mutationFn: () => api.generateInvite(member!.id),
    onSuccess: (res) => {
      queryClient.setQueryData<{ invites: Invite[] }>(queryKeys.invites(member!.id), (current) => ({
        invites: [res.invite, ...(current?.invites ?? [])],
      }));
    },
  });

  const invites = invitesData?.invites ?? [];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    setSaved(false);
    try {
      await updateProfile({
        display_name: displayName || undefined,
        character_class: characterClass || undefined,
        level: level ? parseInt(level, 10) : undefined,
        gear_score: gearScore ? parseInt(gearScore, 10) : undefined,
        bio: bio || undefined,
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGenerateInvite() {
    if (!member) {
      return;
    }

    setError("");

    try {
      await generateInviteMutation.mutateAsync();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate invite");
    }
  }

  async function handleCopyInvite(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      window.setTimeout(() => setCopiedCode((current) => (current === code ? null : current)), 1500);
    } catch {
      setError("Failed to copy invite code");
    }
  }

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#111] border border-gold-800/30 rounded w-full max-w-lg p-8 mx-4 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-neutral-500 hover:text-neutral-300 transition-colors text-lg"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="font-display text-2xl font-bold text-gold-400 tracking-wider uppercase mb-6 text-center">
          Edit Profile
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded px-4 py-2 text-center">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-4 text-sm text-green-400 bg-green-900/20 border border-green-800/30 rounded px-4 py-2 text-center">
            Profile updated!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Display Name">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={50}
              className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Character Class">
            <select
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
            >
              <option value="">Select class...</option>
              {BDO_CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Level">
              <input
                type="number"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                min={1}
                max={75}
                className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
              />
            </Field>
            <Field label="Gear Score">
              <input
                type="number"
                value={gearScore}
                onChange={(e) => setGearScore(e.target.value)}
                min={0}
                max={1000}
                className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors"
              />
            </Field>
          </div>

          <Field label="Bio">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-[#0a0a0a] border border-gold-900/30 rounded px-4 py-3 text-sm text-neutral-200 focus:border-gold-600/60 focus:outline-none transition-colors resize-none"
              placeholder="Tell the guild about yourself..."
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full cursor-pointer py-3 border-2 border-gold-500 text-gold-400 font-display font-semibold text-sm tracking-widest uppercase hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Save Profile"}
          </button>
        </form>

        <div className="mt-8 border-t border-gold-900/20 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-gold-400 uppercase tracking-wider">
                Invite Codes
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Only existing members can generate codes for new registrations.
              </p>
            </div>
            <button
              type="button"
              onClick={handleGenerateInvite}
              disabled={generateInviteMutation.isPending}
              className="shrink-0 cursor-pointer px-4 py-2 border border-gold-600/50 text-gold-400 font-display text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-gold-600/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generateInviteMutation.isPending ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {invites.length === 0 ? (
              <div className="rounded border border-gold-900/20 bg-[#0a0a0a] px-4 py-3 text-sm text-neutral-500">
                No invite codes yet.
              </div>
            ) : (
              invites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between gap-3 rounded border border-gold-900/20 bg-[#0a0a0a] px-4 py-3"
                >
                  <div>
                    <p className="font-mono text-sm tracking-[0.25em] text-gold-300">{invite.code}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-neutral-500">
                      {invite.used_by ? "Used" : "Unused"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyInvite(invite.code)}
                    className="cursor-pointer text-xs uppercase tracking-wider text-neutral-400 hover:text-gold-400 transition-colors"
                  >
                    {copiedCode === invite.code ? "Copied" : "Copy"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
