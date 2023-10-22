import { Experiment } from "@/app/types";
import Link from "next/link";
import { Edit2, PlayCircle, User } from "react-feather";

interface Props {
  experiments: Experiment[];
}

export default function ExperimentsSection({ experiments }: Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-2xl font-semibold">Experiments</h2>
      <div className="grid grid-cols-12 gap-4">
        {experiments.map((experiment) => {
          return (
            <div
              className="col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col flex-1"
              key={experiment.slug}
            >
              <div
                className="aspect-square h-40 w-full bg-cover bg-center rounded-t-md relative group"
                style={{
                  backgroundImage: `url(${experiment.background})`,
                }}
              >
                <div className="absolute flex gap-2 right-2 bottom-2">
                  <div className="flex gap-2 p-1 bg-gray-300 rounded-md">
                    <User size={14} className="stroke-black fill-none" />
                    <span className="text-xs">
                      {Math.floor(Math.random() * 2000)}
                    </span>
                  </div>
                  <Link
                    href={`/experiments/${experiment.slug}/dashboard`}
                    className="flex gap-2 p-1 bg-gray-300 rounded-md"
                  >
                    <Edit2 size={14} className="stroke-black fill-none" />
                  </Link>
                  <Link
                    href={`/experiments/${experiment.slug}`}
                    className="flex gap-2 p-1 bg-gray-300 rounded-md"
                  >
                    <PlayCircle size={14} className="stroke-black fill-none" />
                  </Link>
                </div>
              </div>
              <div className="p-2 bg-gray-200 flex flex-col flex-1 rounded-b-md">
                <h4 className="text-sm font-medium">{experiment.name}</h4>
                <p className="text-xs font-light">{experiment.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
