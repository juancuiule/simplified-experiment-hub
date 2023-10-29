import CreateNewViewForm from "@/components/CreateNewViewForm";
import Link from "next/link";
import { ChevronLeft } from "react-feather";

export default function Page({
  params: { experimentId },
}: {
  params: { experimentId: string };
}) {
  return (
    <div className="max-w-sm w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link href={`/experiments/${experimentId}/views`}>
            <ChevronLeft size={24} />
          </Link>
          <h2 className="text-2xl font-semibold">New view</h2>
        </div>
        <p className="text-sm leading-normal">
          Create a new view for your experiment.
        </p>
      </div>

      <CreateNewViewForm />
    </div>
  );
}
