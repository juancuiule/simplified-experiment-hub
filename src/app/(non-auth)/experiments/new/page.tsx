import CreateExperimentForm from "./CreateExperimentForm";

export default function Page() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Create experiment</h1>
      <CreateExperimentForm />
    </div>
  );
}
