import postgres from "postgres";

export const sql = postgres(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/namelesskingdom"
);

function generateBootstrapInviteCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let index = 0; index < 10; index += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

export async function runMigrations() {
  await sql`
    CREATE TABLE IF NOT EXISTS members (
      id            SERIAL PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name  TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'Member',
      character_class TEXT,
      level         INTEGER,
      gear_score    INTEGER,
      bio           TEXT,
      avatar_url    TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS invite_codes (
      id            SERIAL PRIMARY KEY,
      code          TEXT UNIQUE NOT NULL,
      created_by    INTEGER REFERENCES members(id),
      used_by       INTEGER REFERENCES members(id),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      used_at       TIMESTAMPTZ
    )
  `;

  const memberCountResult = await sql`
    SELECT COUNT(*) AS count FROM members
  `;

  const memberCount = Number(memberCountResult[0]?.count ?? 0);

  if (memberCount > 0) {
    return;
  }

  const existingBootstrapInvite = await sql`
    SELECT code
    FROM invite_codes
    WHERE created_by IS NULL AND used_by IS NULL
    ORDER BY created_at DESC
    LIMIT 1
  `;

  if (existingBootstrapInvite.length > 0) {
    console.log(
      `[bootstrap] First member invite code: ${existingBootstrapInvite[0].code}`
    );
    return;
  }

  let bootstrapCode = "";

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = generateBootstrapInviteCode();
    const existingCode = await sql`
      SELECT id FROM invite_codes WHERE code = ${candidate}
    `;

    if (existingCode.length === 0) {
      bootstrapCode = candidate;
      break;
    }
  }

  if (!bootstrapCode) {
    throw new Error("Failed to generate a unique bootstrap invite code");
  }

  await sql`
    INSERT INTO invite_codes (code, created_by)
    VALUES (${bootstrapCode}, NULL)
  `;

  console.log(`[bootstrap] First member invite code: ${bootstrapCode}`);
}
