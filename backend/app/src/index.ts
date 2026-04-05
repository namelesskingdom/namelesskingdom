import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { runMigrations } from "./db";
import { authRoutes } from "./routes/auth";
import { memberRoutes } from "./routes/members";
import { inviteRoutes } from "./routes/invites";

await runMigrations();

const allowedOrigins = process.env.CORS_ORIGIN
  ? [process.env.CORS_ORIGIN]
  : ["http://localhost:5173"];

const app = new Elysia()
  .use(cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "X-Identity"],
  }))
  .use(authRoutes)
  .use(memberRoutes)
  .use(inviteRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
