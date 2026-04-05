import { sql } from "../db";

export const inviteQueries = {
  findByCode(code: string) {
    return sql`SELECT id, used_by FROM invite_codes WHERE code = ${code}`;
  },

  checkCodeExists(code: string) {
    return sql`SELECT id FROM invite_codes WHERE code = ${code}`;
  },

  create(code: string, createdBy: string | number) {
    return sql`
      INSERT INTO invite_codes (code, created_by)
      VALUES (${code}, ${createdBy})
      RETURNING id, code, created_at
    `;
  },

  markUsed(inviteId: number, usedBy: number) {
    return sql`
      UPDATE invite_codes SET used_by = ${usedBy}, used_at = now() WHERE id = ${inviteId}
    `;
  },

  listByCreator(memberId: string) {
    return sql`
      SELECT id, code, used_by, created_at, used_at
      FROM invite_codes
      WHERE created_by = ${memberId}
      ORDER BY created_at DESC
    `;
  },
};
