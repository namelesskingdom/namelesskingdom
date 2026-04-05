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
    <section id="members" className="relative py-28 bg-[#0c0c0c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(196,154,26,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading>The Kingdom</SectionHeading>
        <p className="text-center text-neutral-500 text-sm mt-4 mb-12">
          Our members — warriors, adventurers, and legends of Black Desert Online
        </p>

        {isPending ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-gold-700/30 border-t-gold-400 rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-sm">No members yet. Be the first to join!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
