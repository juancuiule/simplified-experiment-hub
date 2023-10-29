import { fetchExperimentViews } from "@/api";
import ViewsSection from "@/ui/ViewsSection";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `Views`,
};

export default async function ExperimentViews({
  params,
}: {
  params: { experimentId: string };
}) {
  const views = await fetchExperimentViews(params.experimentId);

  if (!views) {
    return notFound();
  }

  return <ViewsSection views={views} experimentId={params.experimentId} />;
}
