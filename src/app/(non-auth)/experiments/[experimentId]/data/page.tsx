import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "react-feather";

import { API } from "@/api";
import FlatTable from "./FlatTable";

export const metadata: Metadata = {
  title: `Data`,
};

export default async function Page({
  params,
}: {
  params: { experimentId: string };
}) {
  const data = await API.experiments.answers.fetch(params.experimentId);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between items-center h-12 bg-gray-200 rounded p-2.5 gap-2.5">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/experiments/${params.experimentId}`}>
            <ChevronLeft size={16} />
          </Link>
          <span className="font-medium">Participants and data</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-gray-200 rounded-md p-4 gap-4">
        <FlatTable data={data.reverse()} />
      </div>
    </div>
  );
}