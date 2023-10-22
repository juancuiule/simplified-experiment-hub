import { experiments } from "@/app/mock-data";
import Image from "next/image";

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { experimentId: string };
}) {
  const { name, description, background } = experiments.find(
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
            <p className="text-sm">{description}</p>
          </div>
        </div>
        {props.children}
        {props.modal}
      </div>
    </>
  );
}
