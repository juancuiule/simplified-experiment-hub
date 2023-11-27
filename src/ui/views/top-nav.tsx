"use client";

import Link from "next/link";
import { ChevronLeft, Save } from "react-feather";
import { useViewContext } from "./store";
import { API } from "@/api";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function TopNav(props: {
  experimentId: string;
  viewId: string;
}) {
  const router = useRouter();
  const { experimentId, viewId } = props;
  const { widgets } = useViewContext((s) => ({
    widgets: s.widgets,
  }));
  const [isPending, startTransition] = useTransition();

  return (
    <div className="sticky z-10 w-full top-2 flex justify-between items-center h-12 bg-light rounded p-2 gap-2">
      <div className="flex justify-center items-center gap-1">
        <Link href={`/experiments/${experimentId}/views`}>
          <ChevronLeft size={16} />
        </Link>
        <span className="font-medium">View Design - {viewId}</span>
      </div>
      {/* <div className="w-5 h-5 bg-blue-400 sm:bg-red-400 md:bg-green-400 lg:bg-yellow-400 xl:bg-purple-400"></div> */}
      <div className="flex gap-2 text-white">
        <button
          className="flex justify-center items-center gap-2 rounded bg-success px-2 py-1"
          onClick={() => {
            API.experiments.views
              .update(
                experimentId,
                viewId
              )({ widgets })
              .then((res) => {
                startTransition(() => {
                  router.push(`/experiments/${experimentId}/views/`);
                });
                startTransition(() => {
                  router.refresh();
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <span className="font-medium">Save</span>
          <Save size={16} />
        </button>
      </div>
    </div>
  );
}
