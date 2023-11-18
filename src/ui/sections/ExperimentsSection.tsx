import { Experiment } from "@/types";
import Link from "next/link";
import { ExternalLink, Settings, User } from "react-feather";

interface Props {
  experiments: Experiment[];
}

export default function ExperimentsSection({ experiments }: Props) {
  return (
    <section className="flex flex-col w-full gap-4">
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
                  backgroundImage: `url(${experiment.coverImage})`,
                }}
              >
                <div className="absolute flex gap-2 right-2 bottom-2">
                  <div className="flex gap-2 p-1 bg-gray-300 rounded-md">
                    <User size={14} className="stroke-black fill-none" />
                    <span className="text-xs">{experiment.answers}</span>
                  </div>
                  <Link
                    href={`/experiments/${experiment.id}`}
                    className="flex gap-2 p-1 bg-gray-300 rounded-md"
                  >
                    <Settings size={14} className="stroke-black fill-none" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/experiment/${experiment.slug}`}
                    className="flex gap-2 p-1 bg-gray-300 rounded-md"
                  >
                    <ExternalLink
                      size={14}
                      className="stroke-black fill-none"
                    />
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
    </section>
  );
}
