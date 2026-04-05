import { Elysia, t } from "elysia";
import { memberQueries } from "../queries/members";

export const memberRoutes = new Elysia({ prefix: "/api/members" })
  .get("/", async () => {
    const members = await memberQueries.listAll();
    return { members };
  })
  .put(
    "/me",
    async ({ body, headers, set }) => {
      const memberId = headers["x-identity"];
      if (!memberId) {
        set.status = 401;
        return { error: "Not authenticated" };
      }

      const [updated] = await memberQueries.updateProfile(memberId, {
        displayName: body.displayName,
        characterClass: body.characterClass,
        level: body.level,
        gearScore: body.gearScore,
        bio: body.bio,
        avatarUrl: body.avatarUrl,
      });

      if (!updated) {
        set.status = 404;
        return { error: "Member not found" };
      }

      return { member: updated };
    },
    {
      body: t.Object({
        displayName: t.Optional(t.String()),
        characterClass: t.Optional(t.String()),
        level: t.Optional(t.Number()),
        gearScore: t.Optional(t.Number()),
        bio: t.Optional(t.String()),
        avatarUrl: t.Optional(t.String()),
      }),
    }
  );
