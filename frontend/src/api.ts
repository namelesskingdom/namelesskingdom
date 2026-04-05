import type { AuthResponse, Invite, MembersResponse, Member } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request<T>(path: string, opts?: RequestInit & { memberId?: number }): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts?.memberId ? { "X-Identity": String(opts.memberId) } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: { ...headers, ...(opts?.headers as Record<string, string>) },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  register(username: string, password: string, displayName: string, inviteCode: string) {
    return request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password, displayName, inviteCode }),
    });
  },

  generateInvite(memberId: number) {
    return request<{ invite: Invite }>("/api/invites", {
      method: "POST",
      memberId,
    });
  },

  getMyInvites(memberId: number) {
    return request<{ invites: Invite[] }>("/api/invites", {
      memberId,
    });
  },

  login(username: string, password: string) {
    return request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  getMembers() {
    return request<MembersResponse>("/api/members");
  },

  updateProfile(memberId: number, data: Partial<Pick<Member, "display_name" | "character_class" | "level" | "gear_score" | "bio" | "avatar_url">>) {
    return request<{ member: Member }>("/api/members/me", {
      method: "PUT",
      memberId,
      body: JSON.stringify({
        displayName: data.display_name,
        characterClass: data.character_class,
        level: data.level,
        gearScore: data.gear_score,
        bio: data.bio,
        avatarUrl: data.avatar_url,
      }),
    });
  },
};
