export interface Member {
  id: number;
  username: string;
  display_name: string;
  role: string;
  character_class: string | null;
  level: number | null;
  gear_score: number | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface AuthResponse {
  member: Member;
  error?: string;
}

export interface MembersResponse {
  members: Member[];
}

export interface Invite {
  id: number;
  code: string;
  used_by: number | null;
  created_at: string;
  used_at: string | null;
}
