import { fetchTeam } from "@/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { teamId: string };
}

export async function generateMetadata({
  params: { teamId },
}: Props): Promise<Metadata> {
  const team = await fetchTeam(teamId);

  if (team !== null) {
    return {
      title: `Team | ${team.name}`,
    };
  } else {
    return {
      title: `Team not found`,
    };
  }
}

export default async function Team({ params: { teamId } }: Props) {
  const team = await fetchTeam(teamId);

  if (!team) {
    return notFound();
  }

  return <div className="flex flex-col w-full gap-6">Edit team</div>;
}
