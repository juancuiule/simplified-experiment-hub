import { Experiment, Team, View, User as Member } from "./types";

export const views: View[] = [
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

export const members: Member[] = [
  {
    name: "Nadia",
    slug: "nadia",
    organization: "Universidad Tecnológica Nacional",
    avatar: "https://cdn.experiment-hub.com/team/nadia.png",
  },
  {
    name: "Pedro",
    slug: "pedro",
    organization: "Universidad Tecnológica Nacional",
    avatar: "https://cdn.experiment-hub.com/team/pedro.png",
  },
  {
    name: "Carolina",
    slug: "carolina",
    organization: "Universidad Tecnológica Nacional",
    avatar: "https://cdn.experiment-hub.com/team/carolina.png",
  },
  {
    name: "Juan Ignacio",
    slug: "juan-ignacio",
    organization: "Universidad Tecnológica Nacional",
    avatar: "https://cdn.experiment-hub.com/team/juan-ignacio.png",
  },
  {
    name: "Sebastian",
    slug: "sebastian",
    organization: "Universidad Tecnológica Nacional",
    avatar: "https://cdn.experiment-hub.com/team/sebastian.png",
  },
];

export const teams: Team[] = [
  {
    name: "El Gato y La Caja",
    description: "A team of cats and boxes",
    coverImage: "https://cdn.elgatoylacaja.com/2023/02/OG_blanco.png",
    members: [
      {
        name: "Juan Ignacio",
        slug: "juan-ignacio",
        organization: "Universidad Tecnológica Nacional",
        avatar: "https://cdn.experiment-hub.com/team/juan-ignacio.png",
      },
      {
        name: "Vicky Milano",
        slug: "vicky",
        organization: "El Gato y La Caja",
        avatar: "https://cdn.elgatoylacaja.com/2023/02/Vicky.png",
      },
      {
        name: "Javi Goldschmidt",
        slug: "javi",
        organization: "El Gato y La Caja",
        avatar: "https://cdn.elgatoylacaja.com/2023/02/Javi.png",
      },
    ],
    slug: "elgatoylacaja",
  },
  {
    name: "ExpermientHub",
    description: "A team of cats and boxes",
    coverImage:
      "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
    members: members,
    slug: "experimenthub",
  },
];

export const experiments: Experiment[] = [
  {
    id: "1",
    name: "¿Qué pensás sobre las vacunas contra el COVID-19?",
    description:
      "Ayudanos a entender cómo percibimos las diferentes vacunas contra el COVID-19",
    slug: "que-pensas-sobre-las-vacunas-contra-el-covid-19",
    coverImage: "https://cdn.elgatoylacaja.com/2021/02/04._Sitio_4.3.png",
    team: teams[0],
  },
  {
    id: "2",
    name: "El dilema de los argumentos",
    description:
      "Ayudanos a entender mejor cómo las personas formamos nuestras opiniones y tomamos decisiones.",
    slug: "el-dilema-de-los-argumentos",
    coverImage: "https://cdn.elgatoylacaja.com/2020/10/sitio_4.3.png",
    team: teams[1],
  },
  {
    id: "3",
    name: "Quizás, quizás, quizás",
    description:
      "¿Es tu 'tal vez' mi 'quizás'? Puede ser, y estamos haciendo un experimento para averiguarlo.",
    slug: "quizas-quizas-quizas",
    coverImage: "https://cdn.elgatoylacaja.com/2020/08/sitio-4.3.png",
    team: teams[1],
  },
  {
    id: "4",
    name: "¿Se nace o se hace?",
    description:
      "Averiguá cuánto conocés acerca de cómo los genes y los ambientes influyen en nuestros rasgos personales.",
    slug: "se-nace-o-se-hace",
    coverImage: "https://cdn.elgatoylacaja.com/2020/07/tabuexp.png",
    team: teams[1],
  },
  {
    id: "5",
    name: "Tu personalidad en 5 dimensiones",
    description:
      "El test que parece cuestionario de revista pero está cientificamente validado.",
    slug: "tu-personalidad-en-5-dimensiones",
    coverImage: "https://cdn.elgatoylacaja.com/2020/05/ocean_web-4.3.png",
    team: teams[0],
  },
  {
    id: "6",
    name: "Dilemas de la pandemia",
    description:
      "Ayudanos a entender cómo tomamos decisiones morales durante la pandemia.",
    slug: "dilemas-de-la-pandemia",
    coverImage: "https://cdn.elgatoylacaja.com/2020/05/exp.jpg",
    team: teams[0],
  },
  {
    id: "7",
    name: "Pandemias, conciencias y sustancias",
    description: "Un experimento para entender cómo nos pega la cuarentena.",
    slug: "pandemias-conciencias-y-sustancias",
    coverImage:
      "https://cdn.elgatoylacaja.com/2021/10/pandemias-conciencias-sustancias.jpg",
    team: teams[0],
  },
  {
    id: "8",
    name: "¿Vos cómo estás?",
    description:
      "Un experimento para tratar de entender nuestra salud mental durante la pandemia.",
    slug: "vos-como-estas",
    coverImage: "https://cdn.elgatoylacaja.com/2021/10/vos-como-estas.jpg",
    team: teams[0],
  },
];
