import Image from "next/image";
import Link from "next/link";
import { GitHub, Twitter } from "react-feather";

type User = {
  name: string;
  avatar: string;
};

type Team = {
  name: string;
  description: string;
  background: string;
  members: User[];
  slug: string;
};

type Experiment = {
  name: string;
  description: string;
  background: string;
  slug: string;
  team: Team;
};

const teams: Team[] = [
  {
    name: "El Gato y La Caja",
    description: "A team of cats and boxes",
    background: "https://cdn.elgatoylacaja.com/2023/02/OG_blanco.png",

    members: [
      {
        name: "Juan Ignacio Cuiule",
        avatar: "https://cdn.elgatoylacaja.com/2023/02/Juanchi.png",
      },
      {
        name: "Vicky Milano",
        avatar: "https://cdn.elgatoylacaja.com/2023/02/Vicky.png",
      },
      {
        name: "Javi Goldschmidt",
        avatar: "https://cdn.elgatoylacaja.com/2023/02/Javi.png",
      },
    ],
    slug: "elgatoylacaja",
  },
  {
    name: "ExpermientHub",
    description: "A team of cats and boxes",
    background:
      "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
    members: [
      {
        name: "Nadia",
        avatar: "https://cdn.experiment-hub.com/team/nadia.png",
      },
      {
        name: "Pedro",
        avatar: "https://cdn.experiment-hub.com/team/pedro.png",
      },
      {
        name: "Carolina",
        avatar: "https://cdn.experiment-hub.com/team/carolina.png",
      },
      {
        name: "Juan Ignacio",
        avatar: "https://cdn.experiment-hub.com/team/juan-ignacio.png",
      },
      {
        name: "Sebastian",
        avatar: "https://cdn.experiment-hub.com/team/sebastian.png",
      },
    ],
    slug: "experimenthub",
  },
];

const experiments: Experiment[] = [
  {
    name: "¿Qué pensás sobre las vacunas contra el COVID-19?",
    description:
      "Ayudanos a entender cómo percibimos las diferentes vacunas contra el COVID-19",
    slug: "que-pensas-sobre-las-vacunas-contra-el-covid-19",
    background: "https://cdn.elgatoylacaja.com/2021/02/04._Sitio_4.3.png",
    team: teams[0],
  },
  {
    name: "El dilema de los argumentos",
    description:
      "Ayudanos a entender mejor cómo las personas formamos nuestras opiniones y tomamos decisiones.",
    slug: "el-dilema-de-los-argumentos",
    background: "https://cdn.elgatoylacaja.com/2020/10/sitio_4.3.png",
    team: teams[1],
  },
  {
    name: "Quizás, quizás, quizás",
    description:
      "¿Es tu 'tal vez' mi 'quizás'? Puede ser, y estamos haciendo un experimento para averiguarlo.",
    slug: "quizas-quizas-quizas",
    background: "https://cdn.elgatoylacaja.com/2020/08/sitio-4.3.png",
    team: teams[0],
  },
  {
    name: "¿Se nace o se hace?",
    description:
      "Averiguá cuánto conocés acerca de cómo los genes y los ambientes influyen en nuestros rasgos personales.",
    slug: "se-nace-o-se-hace",
    background: "https://cdn.elgatoylacaja.com/2020/07/tabuexp.png",
    team: teams[0],
  },
  {
    name: "Tu personalidad en 5 dimensiones",
    description:
      "El test que parece cuestionario de revista pero está cientificamente validado.",
    slug: "tu-personalidad-en-5-dimensiones",
    background: "https://cdn.elgatoylacaja.com/2020/05/ocean_web-4.3.png",
    team: teams[0],
  },
  {
    name: "Dilemas de la pandemia",
    description:
      "Ayudanos a entender cómo tomamos decisiones morales durante la pandemia.",
    slug: "dilemas-de-la-pandemia",
    background: "https://cdn.elgatoylacaja.com/2020/05/exp.jpg",
    team: teams[0],
  },
  {
    name: "Pandemias, conciencias y sustancias",
    description: "Un experimento para entender cómo nos pega la cuarentena.",
    slug: "pandemias-conciencias-y-sustancias",
    background:
      "https://cdn.elgatoylacaja.com/2021/10/pandemias-conciencias-sustancias.jpg",
    team: teams[0],
  },
  {
    name: "¿Vos cómo estás?",
    description:
      "Un experimento para tratar de entender nuestra salud mental durante la pandemia.",
    slug: "vos-como-estas",
    background: "https://cdn.elgatoylacaja.com/2021/10/vos-como-estas.jpg",
    team: teams[0],
  },
];

export default function Profile() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Profile info */}
      <div className="flex items-center justify-center gap-4">
        <div className="rounded-full cursor-pointer">
          <Image
            className="rounded-full aspect-square w-40 h-40"
            src={`https://avatars.githubusercontent.com/u/12143451?v=4`}
            alt="Profile image"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Juan Ignacio Cuiule</h1>
          <p className="text-lg text-gray-500">El Gato y La Caja</p>
          <div className="flex gap-2">
            <Twitter size={16} className="stroke-info fill-info" />
            <GitHub size={16} className="stroke-black fill-none" />
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-2xl font-semibold">Teams</h2>
        <div className="grid grid-cols-12 gap-4">
          {teams.map((team) => {
            const membersToShow = team.members.slice(0, 3);
            const membersDiff = team.members.length - membersToShow.length;
            return (
              <Link
                href={`/teams/${team.slug}`}
                className="col-span-4 flex flex-col cursor-pointer"
                key={team.slug}
              >
                <div
                  className="aspect-video h-40 w-full bg-cover bg-center rounded-t-md relative group"
                  style={{
                    backgroundImage: `url(${team.background})`,
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0 12px 5px inset",
                  }}
                >
                  <div className="absolute right-0 bottom-0 p-1 flex justify-end items-center w-full bg-gradient-to-b from-transparent to-black/50 transition-all">
                    {membersToShow.map((member, i, m) => (
                      <div
                        key={member.name}
                        className={`w-8 ${
                          i === m.length - 1 ? "mr-0" : "-mr-2"
                        } border border-black h-8 aspect-square rounded-full bg-cover bg-center`}
                        style={{
                          backgroundImage: `url(${member.avatar})`,
                        }}
                      />
                    ))}
                    {membersDiff > 0 && (
                      <div className="w-0 opacity-0 group-hover:opacity-100 group-hover:w-6 h-6 flex justify-center items-center font-mono text-xs transition-all">
                        +{membersDiff}
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-2 py-1 bg-gray-200 rounded-b-md">
                  <h4 className="text-sm font-medium">{team.name}</h4>
                  <p className="text-xs font-light">{team.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Experiments */}
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-2xl font-semibold">Experiments</h2>
        <div className="grid grid-cols-12 gap-4">
          {experiments.map((experiment) => {
            return (
              <Link
                href={`/experiments/${experiment.slug}`}
                className="col-span-4 flex flex-col cursor-pointer flex-1"
                key={experiment.slug}
              >
                <div
                  className="aspect-square h-40 w-full bg-cover bg-center rounded-t-md relative group"
                  style={{
                    backgroundImage: `url(${experiment.background})`,
                  }}
                >
                  {/* <div className="absolute right-0 bottom-0 p-1 gap-2 flex justify-start items-center w-full bg-gradient-to-b from-transparent to-black/50 transition-all">
                    <div
                      className={`w-8 border border-black h-8 aspect-square rounded-full bg-cover bg-center`}
                      style={{
                        backgroundImage: `url(${experiment.team.background})`,
                      }}
                    />
                    <span className="text-sm font-semibold">{experiment.team.name}</span>
                  </div> */}
                </div>
                <div className="p-2 bg-gray-200 flex flex-col flex-1 rounded-b-md">
                  <h4 className="text-sm font-medium">{experiment.name}</h4>
                  <p className="text-xs font-light">{experiment.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
