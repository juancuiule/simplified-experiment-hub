import CreateExperimentForm from "@/components/CreateExperimentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create experiment | Experiment Hub",
};

export default function Page() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Create experiment</h1>
      <CreateExperimentForm />
    </div>
  );
}
