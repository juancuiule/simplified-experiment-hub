import { fetchExperiment } from "@/api";
import Experiment from "@/components/Experiment";
import { FrameworkNode } from "@/lib/nodes";
import { Metadata } from "next";

import { notFound } from "next/navigation";

type Experiment = {
  nodes: FrameworkNode[];
};

interface Props {
  params: { experimentId: string };
}

export async function generateMetadata({
  params: { experimentId },
}: Props): Promise<Metadata> {
  const experiment = await fetchExperiment(experimentId);

  if (!experiment) {
    return {
      title: "Experiment not found",
    };
  } else {
    const { name: title, description, background } = experiment;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: {
          url: background,
        },
      },
      twitter: {
        title,
        description,
        images: { url: background },
      },
    };
  }
}

export default async function ExperimentPage({
  params: { experimentId },
}: Props) {
  const experiment = await fetchExperiment(experimentId);

  if (!experiment) {
    notFound();
  }

  // TODO: fetch experiment data
  return (
    <div className="flex flex-col mx-auto gap-4 max-w-lg w-full p-6 flex-1">
      <Experiment />
    </div>
  );
}
