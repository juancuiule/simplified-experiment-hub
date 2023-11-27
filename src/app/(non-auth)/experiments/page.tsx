import { API } from "@/api";
import ExperimentsSection from "@/ui/sections/ExperimentsSection";

export default async function Page() {
  const experiments = await API.experiments.fetchAll();

  if (experiments !== null) {
    return <ExperimentsSection experiments={experiments} showNew={false} />;
  }

  throw new Error("Failed to fetch experiments");
}
