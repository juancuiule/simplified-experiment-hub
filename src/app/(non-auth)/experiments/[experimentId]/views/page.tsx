import Link from "next/link";
import { ChevronLeft } from "react-feather";

type View = {
  name: string;
  description: string;
  slug: string;
  preview: string;
};

const views: View[] = [
  {
    name: "Intro + Términos",
    description:
      "Primera pantalla donde explicamos un poco de qué se trata el experimento y cuáles son las condiciones para participar",
    slug: "terms",
    preview: "https://cdn.experiment-hub.com/previews/preview-terminos.png",
  },
  {
    name: "Para empezar",
    description: "Pantalla donde hacemos preguntas generales",
    slug: "para-empezar",
    preview: "https://cdn.experiment-hub.com/previews/preview-para-empezar.png",
  },
  {
    name: "Psicodelicos",
    description:
      "Pantalla donde preguntamos cosas relacionadas a los psicodelicos consumidos por la persona",
    slug: "psicodelicos",
    preview: "https://cdn.experiment-hub.com/previews/preview-psicodelicos.png",
  },
  {
    name: "Gracias",
    description:
      "Pantalla donde ya se guardaron las respuestas y damos un feedack al participante",
    slug: "gracias",
    preview: "https://cdn.experiment-hub.com/previews/preview-gracias.png",
  },
];

export default function ExperimentViews({
  params,
}: {
  params: { experimentId: string };
}) {
  return (
    <div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center gap-2">
          <Link href={`/experiments/${params.experimentId}/dashboard`}>
            <ChevronLeft size={24} />
          </Link>
          <h2 className="text-2xl font-semibold">Views</h2>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {views.map((view) => {
            return (
              <Link
                href={`/experiments/${params.experimentId}/views/${view.slug}`}
                className="col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col cursor-pointer flex-1"
                key={view.slug}
              >
                <div
                  className="aspect-video h-40 w-full bg-cover bg-center rounded-t-md relative group"
                  style={{
                    backgroundImage: `url(${view.preview})`,
                  }}
                ></div>
                <div className="p-2 bg-gray-200 flex flex-col flex-1 rounded-b-md">
                  <h4 className="text-sm font-medium">{view.name}</h4>
                  <p className="text-xs font-light">{view.description}</p>
                </div>
              </Link>
            );
          })}
          <Link
            href={`/experiments/${params.experimentId}/views/new`}
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
      </div>
    </div>
  );
}
