import { API } from "@/api";
import ExperimentsSection from "@/ui/sections/ExperimentsSection";
import { cookies } from "next/headers";

export default async function Page() {
  const experiments = await API.experiments.fetchAll();
  const accessToken = cookies().get("accessToken");
  const isAuthed = accessToken !== undefined;

  if (experiments !== null) {
    return <ExperimentsSection experiments={experiments} isAuthed={isAuthed} />;
  }

  throw new Error("Failed to fetch experiments");
}
