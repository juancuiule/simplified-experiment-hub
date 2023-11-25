import { API } from "@/api";
import Experiment from "@/components/Experiment";
import { FrameworkNode } from "@/lib/nodes";
import { Metadata } from "next";

import { notFound } from "next/navigation";

export const revalidate = 0;

type Experiment = {
  nodes: FrameworkNode[];
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const experiment = await API.experiments.fetchBySlug(slug);

  if (!experiment) {
    return {
      title: "Experiment not found",
    };
  } else {
    const { name: title, description, coverImage: background } = experiment;
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

export default async function ExperimentPage({ params: { slug } }: Props) {
  const experiment = await API.experiments.fetchBySlug(slug);

  if (!experiment) {
    notFound();
  }

  return (
    <div className="flex flex-col mx-auto gap-4 max-w-lg w-full p-6 flex-1">
      <Experiment experiment={experiment} id={experiment.pk.toString()} />
    </div>
  );
}
