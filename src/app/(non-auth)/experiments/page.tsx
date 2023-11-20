import { API } from "@/api";
import ExperimentsSection from "@/ui/sections/ExperimentsSection";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const experiments = await API.experiments.fetchAll();

  if (experiments !== null) {
    return <ExperimentsSection experiments={experiments} />;
  }

  throw new Error("Failed to fetch experiments");
}
