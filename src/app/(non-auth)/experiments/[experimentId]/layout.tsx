import { experiments } from "@/app/mock-data";
import { BASE_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { experimentId: string };
}) {
  const { name, description, background, slug, team } = experiments.find(
    (e) => e.slug === props.params.experimentId
  )!;
  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-start justify-start gap-4 flex-col md:flex-row">
          <div className="aspect-video w-full md:h-full md:w-auto flex justify-center items-center overflow-hidden border border-gray-200 rounded-md">
            <Image
              src={background}
              alt="Team background image"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{name}</h1>
            <span className="text-xs text-gray-400">
              created by{" "}
              <Link
                href={`${BASE_URL}/teams/${team.slug}`}
                className="hover:text-blue-400 font-semibold"
              >
                {team.name}
              </Link>
            </span>
            <span className="text-sm">
              URL:{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`${BASE_URL}/experiments/${slug}`}
                className="text-blue-400 hover:text-blue-500"
              >{`${BASE_URL}/experiments/${slug}`}</Link>
            </span>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        {props.children}
        {props.modal}
      </div>
    </>
  );
}
