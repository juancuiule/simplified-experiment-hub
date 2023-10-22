import { experiments } from "@/app/mock-data";
import Link from "next/link";
import { ChevronLeft } from "react-feather";
import EditExperimentForm from "./EditExperimentForm";

export default function EditExperiment({
  params: { experimentId },
}: {
  params: { experimentId: string };
}) {
  const {
    name,
    description,
    background: cover,
    slug,
  } = experiments.find((e) => e.slug === experimentId)!;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-start items-center gap-1">
        <Link href={`/experiments/${experimentId}/dashboard`}>
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold">Edit experiment</h1>
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
