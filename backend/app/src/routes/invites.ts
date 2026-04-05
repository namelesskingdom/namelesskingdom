import { Elysia } from "elysia";
import { memberQueries } from "../queries/members";
import { inviteQueries } from "../queries/invites";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export const inviteRoutes = new Elysia({ prefix: "/api/invites" })
  .post("/", async ({ headers, set }) => {
    const memberId = headers["x-identity"];
    if (!memberId) {
      set.status = 401;
      return { error: "Not authenticated" };
    }

    // Verify the member exists
    const [member] = await memberQueries.findById(memberId);
    if (!member) {
      set.status = 401;
      return { error: "Member not found" };
    }

    // Generate a unique code (retry on collision)
    let code: string;
    let attempts = 0;
    do {
      code = generateCode();
      attempts++;
      const existing = await inviteQueries.checkCodeExists(code);
      if (existing.length === 0) break;
    } while (attempts < 5);

    const [invite] = await inviteQueries.create(code, memberId);

    return { invite };
  })
  .get("/", async ({ headers, set }) => {
    const memberId = headers["x-identity"];
    if (!memberId) {
      set.status = 401;
      return { error: "Not authenticated" };
    }

    const invites = await inviteQueries.listByCreator(memberId);

    return { invites };
  });
