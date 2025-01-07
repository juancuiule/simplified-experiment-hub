import { Experiment as ExperimentType } from "@/api";
import Experiment from "@/components/Experiment";
import { Metadata } from "next";

import { notFound } from "next/navigation";

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

const BASE_URL =
  "https://raw.githubusercontent.com/juancuiule/simplified-experiment-hub/refs/heads/main";

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const experiment: ExperimentType = await fetch(
    `${BASE_URL}/public/configs/${slug}.json`
  ).then((res) => res.json());

  if (!experiment) {
    return {};
  }

  return {
    title: experiment.name,
    description: experiment.description,
  };
}

export default async function ExperimentPage({ params: { slug } }: Props) {
  const experiment: ExperimentType = await fetch(
    `${BASE_URL}/public/configs/${slug}.json`
  ).then((res) => res.json());

  if (!experiment) {
    notFound();
  }

  return (
    <div className="flex flex-col mx-auto gap-4 max-w-lg w-full p-6 flex-1">
      <Experiment experiment={experiment} id={"id"} />
    </div>
  );
}
