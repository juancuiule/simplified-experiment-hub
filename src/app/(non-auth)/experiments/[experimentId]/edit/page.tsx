import { fetchExperiment } from "@/api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "react-feather";
import EditExperimentForm from "./EditExperimentForm";

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

  const { name, description, background: cover, slug } = experiment;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-start items-center gap-1">
        <Link href={`/experiments/${experimentId}/dashboard`}>
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-2xl font-semibold">Edit experiment</h2>
      </div>
      <EditExperimentForm
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
