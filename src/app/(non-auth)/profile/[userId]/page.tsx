import { experiments, teams } from "@/app/mock-data";
import ExperimentsSection from "@/components/ExperimentsSection";
import TeamsSection from "@/components/TeamsSection";
import Image from "next/image";
import { GitHub, Twitter } from "react-feather";

export default function UserProfile({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = teams.flatMap((t) => t.members).find((m) => m.slug === userId)!;
  const userTeams = teams.filter((t) =>
    t.members.some((m) => m.slug === userId)
  );
  const userExperiments = experiments.filter((e) =>
    userTeams.map((t) => t.slug).includes(e.team.slug)
  );

  return (
    <div className="flex flex-col items-start gap-6">
      {/* Profile info */}
      <div className="flex items-center justify-center gap-4">
        <div className="rounded-full w-40 h-40 aspect-square overflow-hidden flex justify-center items-center">
          <Image
            src={user.avatar}
            alt="Profile image"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-md text-gray-500 leading-tight">
            {user.organization}
          </p>
          <div className="flex gap-2 mt-2">
            <Twitter size={16} className="stroke-info fill-info" />
            <GitHub size={16} className="stroke-black fill-none" />
          </div>
        </div>
      </div>

      {/* Teams */}
      <TeamsSection teams={userTeams} />

      {/* Experiments */}
      <ExperimentsSection experiments={userExperiments} />
    </div>
  );
}
