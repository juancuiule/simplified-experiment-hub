"use client";
import { API, Entity, Experiment } from "@/api";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Settings, Trash2, User } from "react-feather";

interface Props {
  experiments: Entity<Experiment>[];
}

export default function ExperimentsSection({ experiments }: Props) {
  const [experimentList, setExperimentList] = useState(experiments);

  return (
    <section className="flex flex-col w-full gap-4">
      <h2 className="text-2xl font-semibold">Experiments</h2>
      <div className="grid grid-cols-12 gap-4">
        {experimentList.map((experiment) => {
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
                    href={`/experiments/${experiment.pk}`}
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
                  <button
                    className="flex gap-2 p-1 bg-gray-300 rounded-md group/delete hover:bg-white transition-colors"
                    onClick={() => {
                      API.experiments
                        .delete(experiment.pk.toString())
                        .then((res) => {
                          setExperimentList(
                            experimentList.filter((e) => e.pk !== experiment.pk)
                          );
                        });
                    }}
                  >
                    <Trash2
                      size={14}
                      className="stroke-black fill-none group-hover/delete:stroke-error transition-colors"
                    />
                  </button>
                </div>
              </div>
              <div className="p-2 bg-gray-200 flex flex-col flex-1 rounded-b-md">
                <h4 className="text-sm font-medium">{experiment.name}</h4>
                <p className="text-xs font-light">{experiment.description}</p>
                <div className="h-[1px] w-full bg-black/20 my-2"></div>
                <Link
                  href={`/experiment/${experiment.slug}`}
                  className="text-xs text-blue-400"
                >
                  /{experiment.slug}
                </Link>
              </div>
            </div>
          );
        })}
        <Link
          href={`/experiments/new`}
          className={`
              flex flex-col justify-center items-center flex-1
              border border-dashed border-gray-300 text-gray-300
              hover:border-black hover:text-black
              col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer rounded-md
              transition-colors aspect-video h-full w-full
              `}
        >
          <span className="text-sm font-semibold">New experiment</span>
        </Link>
      </div>
    </section>
  );
}
