import { views } from "@/app/mock-data";
import ViewsSection from "@/components/ViewsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Views`,
};

export default function ExperimentViews({
  params,
}: {
  params: { experimentId: string };
}) {
  return <ViewsSection views={views} experimentId={params.experimentId} />;
}
