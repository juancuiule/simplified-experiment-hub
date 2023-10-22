import { experiments } from "@/app/mock-data";
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
      <h1 className="text-3xl font-bold">Edit experiment</h1>
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
