import { experiments } from "@/app/mock-data";
import { FrameworkNode } from "@/lib/nodes";
import { Metadata } from "next";
import Experiment from "./Experiment";

type Experiment = {
  nodes: FrameworkNode[];
};

interface Props {
  params: { experimentId: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {
    name: title,
    description,
    background,
  } = experiments.find((e) => e.slug === props.params.experimentId)!;

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

export default function ExperimentPage({ params }: Props) {
  return (
    <div className="flex flex-col mx-auto gap-4 max-w-lg w-full p-6 border border-black flex-1">
      <Experiment />
    </div>
  );
}
