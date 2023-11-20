import { API } from "@/api";
import ViewsSection from "@/ui/sections/ViewsSection";
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
  const { views } = await API.experiments.fetch(params.experimentId);

  if (!views) {
    return notFound();
  }

  return <ViewsSection views={views} experimentId={params.experimentId} />;
}
