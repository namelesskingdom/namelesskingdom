import { Elysia, t } from "elysia";
import { memberQueries } from "../queries/members";
import { inviteQueries } from "../queries/invites";

export const authRoutes = new Elysia({ prefix: "/api/auth" })
  .post(
    "/register",
    async ({ body, set }) => {
      const { username, password, displayName, inviteCode } = body;

      // Validate invite code
      const [invite] = await inviteQueries.findByCode(inviteCode);
      if (!invite) {
        set.status = 403;
        return { error: "Invalid invite code" };
      }
      if (invite.used_by) {
        set.status = 403;
        return { error: "Invite code has already been used" };
      }

      const existing = await memberQueries.checkUsernameExists(username);
      if (existing.length > 0) {
        set.status = 409;
        return { error: "Username already taken" };
      }

      const passwordHash = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 10,
      });

      const [member] = await memberQueries.create(username, passwordHash, displayName);

      // Mark invite code as used
      await inviteQueries.markUsed(invite.id, member.id);

      return { member };
    },
    {
      body: t.Object({
        username: t.String({ minLength: 3, maxLength: 30 }),
        password: t.String({ minLength: 6, maxLength: 128 }),
        displayName: t.String({ minLength: 1, maxLength: 50 }),
        inviteCode: t.String({ minLength: 1 }),
      }),
    }
  )
  .post(
    "/login",
    async ({ body, set }) => {
      const { username, password } = body;

      const [member] = await memberQueries.findByUsername(username);

      if (!member) {
        set.status = 401;
        return { error: "Invalid username or password" };
      }

      const valid = await Bun.password.verify(password, member.password_hash);
      if (!valid) {
        set.status = 401;
        return { error: "Invalid username or password" };
      }

      const { password_hash, ...safe } = member;
      return { member: safe };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  );
