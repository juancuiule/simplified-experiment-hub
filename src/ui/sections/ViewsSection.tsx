import { View } from "@/types";
import Link from "next/link";
import { ChevronLeft } from "react-feather";

interface Props {
  views: View[];
  experimentId: string;
}

export default function ViewsSection({ experimentId, views }: Props) {
  return (
    <section className="flex flex-col w-full gap-4">
      <div className="flex items-center gap-2">
        <Link href={`/experiments/${experimentId}`}>
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-2xl font-semibold">Views</h2>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {views.map((view) => {
          return (
            <Link
              href={`/experiments/${experimentId}/views/${view.slug}`}
              className="col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col cursor-pointer flex-1"
              key={view.slug}
            >
              <div
                className="aspect-video h-40 w-full bg-cover bg-center rounded-t-md relative group"
                style={{
                  backgroundImage: `url(${view.preview})`,
                }}
              ></div>
              <div className="p-2 bg-gray-200 flex flex-col flex-1 rounded-b-md gap-1">
                <h4 className="text-sm font-medium">{view.name}</h4>
                <p className="text-xs font-light">{view.description}</p>
              </div>
            </Link>
          );
        })}
        <Link
          href={`/experiments/${experimentId}/views/new`}
          className={`
              flex flex-col justify-center items-center flex-1
              border border-dashed border-gray-300 text-gray-300
              hover:border-black hover:text-black
              col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer rounded-md
              transition-colors aspect-video h-full w-full
              `}
        >
          <span className="text-sm font-semibold">New view</span>
        </Link>
      </div>
    </section>
  );
}
