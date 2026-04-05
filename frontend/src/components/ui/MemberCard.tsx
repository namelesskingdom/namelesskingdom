import type { Member } from "../../types";

const CLASS_COLORS: Record<string, string> = {
  Warrior: "#c9302c",
  Ranger: "#5cb85c",
  Sorceress: "#8e44ad",
  Berserker: "#d35400",
  Tamer: "#2ecc71",
  Musa: "#e74c3c",
  Maehwa: "#e91e63",
  Valkyrie: "#3498db",
  Kunoichi: "#9b59b6",
  Ninja: "#2c3e50",
  Wizard: "#2980b9",
  Witch: "#8e44ad",
  "Dark Knight": "#6c3483",
  Striker: "#e67e22",
  Mystic: "#1abc9c",
  Lahn: "#c0392b",
  Archer: "#27ae60",
  Shai: "#f39c12",
  Guardian: "#7f8c8d",
  Hashashin: "#d4a928",
  Nova: "#5dade2",
  Sage: "#48c9b0",
  Corsair: "#2e86c1",
  Drakania: "#a93226",
  Woosa: "#aed6f1",
  Maegu: "#f1948a",
  Scholar: "#85929e",
};

export function MemberCard({ member }: { member: Member }) {
  const initials = member.display_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const classColor = member.character_class
    ? CLASS_COLORS[member.character_class] || "#c49a1a"
    : "#c49a1a";

  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded border border-gold-800/20 bg-[#111]/80 backdrop-blur-sm hover:border-gold-600/30 transition-colors duration-300">
      {member.avatar_url ? (
        <img
          src={member.avatar_url}
          alt={member.display_name}
          className="w-18 h-18 rounded-full object-cover border-2 border-gold-700/40"
        />
      ) : (
        <div
          className="w-18 h-18 rounded-full border-2 border-gold-700/40 flex items-center justify-center font-display font-bold text-xl"
          style={{ backgroundColor: `${classColor}22`, color: classColor }}
        >
          {initials}
        </div>
      )}
      <div className="flex flex-col gap-0.5 text-center">
        <p className="font-display text-gold-300 font-semibold text-sm">{member.display_name}</p>
        <p className="text-[11px] text-neutral-500 uppercase tracking-wider">{member.role}</p>
      </div>
      {member.character_class && (
        <span
          className="text-xs px-2 py-0.5 rounded-full border"
          style={{ borderColor: `${classColor}44`, color: classColor }}
        >
          {member.character_class}
        </span>
      )}
      {(member.level || member.gear_score) && (
        <div className="flex gap-3 text-[11px] text-neutral-500">
          {member.level && <span>Lv. {member.level}</span>}
          {member.gear_score && <span>GS {member.gear_score}</span>}
        </div>
      )}
    </div>
  );
}
