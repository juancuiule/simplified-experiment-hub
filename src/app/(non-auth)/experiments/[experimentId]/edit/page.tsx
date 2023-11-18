import { fetchExperiment } from "@/api";
import EditExperimentForm from "@/ui/experiments/edit-experiment-form";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "react-feather";

export const metadata: Metadata = {
  title: `Edit`,
};

export default async function EditExperiment({
  params: { experimentId },
}: {
  params: { experimentId: string };
}) {
  const experiment = await fetchExperiment(experimentId);

  if (!experiment) {
    notFound();
  }

  const { name, description, coverImage: cover, slug } = experiment;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-start items-center gap-1">
        <Link href={`/experiments/${experimentId}`}>
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-2xl font-semibold">Edit experiment</h2>
      </div>
      <EditExperimentForm
        id={experimentId}
        initialValues={{
          name,
          description,
          cover,
          slug,
        }}
      />
    </div>
  );
}
