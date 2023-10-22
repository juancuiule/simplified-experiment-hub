import Link from "next/link";
import { ChevronLeft } from "react-feather";
import CreateNewViewForm from "./CreateNewViewForm";

export default function Page({
  params: { experimentId },
}: {
  params: { experimentId: string };
}) {
  return (
    <div className="max-w-sm w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link href={`/experiments/${experimentId}/dashboard`}>
            <ChevronLeft size={24} />
          </Link>
          <h1 className="ext-2xl font-semibold">New view</h1>
        </div>
        <p className="text-sm leading-normal">
          Create a new view for your experiment.
        </p>
      </div>

      <CreateNewViewForm />
    </div>
  );
}
