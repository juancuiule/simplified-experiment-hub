import { API } from "@/api";
import { useUser } from "@/hooks";
import CreateTeamForm from "@/ui/teams/create-team-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create team | Experiment Hub",
};

export default async function Page() {
  const user = useUser();

  const userId = (user?.pk?.toString() || "1");

  return (
    <div className="max-w-sm w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Create experiment</h1>
      <CreateTeamForm userId={userId} />
    </div>
  );
}
