import { sql } from "../db";

export const memberQueries = {
  findByUsername(username: string) {
    return sql`
      SELECT id, username, password_hash, display_name, role, character_class, level, gear_score, bio, avatar_url
      FROM members WHERE username = ${username}
    `;
  },

  findById(id: number | string) {
    return sql`SELECT id FROM members WHERE id = ${id}`;
  },

  checkUsernameExists(username: string) {
    return sql`SELECT id FROM members WHERE username = ${username}`;
  },

  create(username: string, passwordHash: string, displayName: string) {
    return sql`
      INSERT INTO members (username, password_hash, display_name)
      VALUES (${username}, ${passwordHash}, ${displayName})
      RETURNING id, username, display_name, role, character_class, level, gear_score, bio, avatar_url
    `;
  },

  listAll() {
    return sql`
      SELECT id, username, display_name, role, character_class, level, gear_score, bio, avatar_url, created_at
      FROM members
      ORDER BY
        CASE role
          WHEN 'Guild Master' THEN 0
          WHEN 'Officer' THEN 1
          ELSE 2
        END,
        created_at ASC
    `;
  },

  updateProfile(
    memberId: string,
    data: {
      displayName?: string | null;
      characterClass?: string | null;
      level?: number | null;
      gearScore?: number | null;
      bio?: string | null;
      avatarUrl?: string | null;
    }
  ) {
    return sql`
      UPDATE members SET
        display_name = COALESCE(${data.displayName ?? null}, display_name),
        character_class = COALESCE(${data.characterClass ?? null}, character_class),
        level = COALESCE(${data.level ?? null}, level),
        gear_score = COALESCE(${data.gearScore ?? null}, gear_score),
        bio = COALESCE(${data.bio ?? null}, bio),
        avatar_url = COALESCE(${data.avatarUrl ?? null}, avatar_url),
        updated_at = now()
      WHERE id = ${memberId}
      RETURNING id, username, display_name, role, character_class, level, gear_score, bio, avatar_url
    `;
  },
};
