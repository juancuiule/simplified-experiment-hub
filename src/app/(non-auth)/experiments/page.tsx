import { fetchExperiments } from "@/api";
import ExperimentsSection from "@/ui/sections/ExperimentsSection";

export default async function Page() {
  const experiments = await fetchExperiments();

  if (experiments !== null) {
    return <ExperimentsSection experiments={experiments} />;
  }

  throw new Error("Failed to fetch experiments");
}
