import { views } from "@/app/mock-data";
import ViewsSection from "@/components/ViewsSection";

export default function ExperimentViews({
  params,
}: {
  params: { experimentId: string };
}) {
  return <ViewsSection views={views} experimentId={params.experimentId} />;
}
