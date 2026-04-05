import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Member } from "../types";
import { api } from "../api";
import { queryKeys } from "../lib/queryKeys";

interface AuthState {
  member: Member | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, displayName: string, inviteCode: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<Member, "display_name" | "character_class" | "level" | "gear_score" | "bio" | "avatar_url">>) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = "nk_member";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMember(JSON.parse(stored));
      } catch { /* ignore corrupt data */ }
    }
    setLoading(false);
  }, []);

  function persist(m: Member | null) {
    setMember(m);
    if (m) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      api.login(username, password),
    onSuccess: (res) => {
      persist(res.member);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({
      username,
      password,
      displayName,
      inviteCode,
    }: {
      username: string;
      password: string;
      displayName: string;
      inviteCode: string;
    }) => api.register(username, password, displayName, inviteCode),
    onSuccess: (res) => {
      persist(res.member);
      queryClient.invalidateQueries({ queryKey: queryKeys.members });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({
      memberId,
      data,
    }: {
      memberId: number;
      data: Partial<Pick<Member, "display_name" | "character_class" | "level" | "gear_score" | "bio" | "avatar_url">>;
    }) => api.updateProfile(memberId, data),
    onSuccess: (res) => {
      persist(res.member);
      queryClient.invalidateQueries({ queryKey: queryKeys.members });
    },
  });

  async function login(username: string, password: string) {
    await loginMutation.mutateAsync({ username, password });
  }

  async function register(username: string, password: string, displayName: string, inviteCode: string) {
    await registerMutation.mutateAsync({ username, password, displayName, inviteCode });
  }

  function logout() {
    persist(null);
  }

  async function updateProfile(data: Partial<Pick<Member, "display_name" | "character_class" | "level" | "gear_score" | "bio" | "avatar_url">>) {
    if (!member) return;
    await updateProfileMutation.mutateAsync({ memberId: member.id, data });
  }

  return (
    <AuthContext.Provider value={{ member, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
