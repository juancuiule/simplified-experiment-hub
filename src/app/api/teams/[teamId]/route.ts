import { experiments, teams } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const { teamId } = params;
  const team = teams.find((t) => t.slug === teamId);
  const teamExperiments = experiments.filter((e) => e.team.slug === teamId);
  // .map(({ team, ...rest }) => rest);

  if (!team) {
    return new Response("Team not found", {
      status: 404,
    });
  } else {
    return NextResponse.json({ ...team, experiments: teamExperiments });
  }
}
