import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "../ui/SectionHeading";
import { MemberCard } from "../ui/MemberCard";
import { api } from "../../api";
import { queryKeys } from "../../lib/queryKeys";

export function MembersSection() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.members,
    queryFn: () => api.getMembers(),
  });

  const members = data?.members ?? [];

  return (
    <section id="members" className="relative flex justify-center bg-[#0c0c0c] px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(196,154,26,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-12">
        <SectionHeading>The Kingdom</SectionHeading>
        <div className="flex flex-col gap-4">
          <p className="text-center text-sm text-neutral-500">
            Our members — warriors, adventurers, and legends of Black Desert Online
          </p>

          {isPending ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-gold-700/30 border-t-gold-400 animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-neutral-500">No members yet. Be the first to join!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
