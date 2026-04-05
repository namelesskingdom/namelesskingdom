export const queryKeys = {
  members: ["members"] as const,
  invites: (memberId: number | null) => ["invites", memberId] as const,
};
