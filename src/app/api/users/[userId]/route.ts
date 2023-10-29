import { experiments, teams } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const user = teams.flatMap((t) => t.members).find((m) => m.slug === userId)!;
  const userTeams = teams.filter((t) =>
    t.members.some((m) => m.slug === userId)
  );
  const userExperiments = experiments.filter((e) =>
    userTeams.map((t) => t.slug).includes(e.team.slug)
  );

  if (!user) {
    return new Response("User not found", {
      status: 404,
    });
  } else {
    return NextResponse.json({
      ...user,
      teams: userTeams,
      experiments: userExperiments,
    });
  }
}
