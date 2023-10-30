import {
  CornerUpRight,
  Database,
  Flag,
  GitBranch,
  Icon,
  Monitor,
  Play,
  Shuffle,
  SkipForward,
} from "react-feather";

type Item = {
  icon: Icon;
  title: string;
  description: string;
};

export const items: Record<string, Item[]> = {
  core: [
    {
      icon: Play,
      title: "Start",
      description: "Representa el inicio del experimento",
    },
    {
      icon: Flag,
      title: "Finish",
      description: "Representa el final del experimento",
    },
    {
      icon: Database,
      title: "Checkpoint",
      description:
        "Es un nodo que una vez aue la persona pasa por ahí envía los datos al backend",
    },
    {
      icon: SkipForward,
      title: "NoOp",
      description:
        "Es un nodo que sirve para casos particulares donde encesitamos un nodo para ocupar un lugar pero tiene que al caer ahí tiene que pasar directamente al siguiente. En principio es un workaround para casos donde un branch tiene una rama que implica saltearse la otra.",
    },
  ],
  study: [
    {
      icon: Monitor,
      title: "Experiment Step",
      description:
        "Es un step ad-hoc del experimento (no viene de un cuestionario). Es una lista de widgets que se muestran en esa pantalla",
    },
  ],
  control: [
    {
      icon: GitBranch,
      title: "Branch",
      description: "Nodo que sirve para dividir el flujo en base a algún valor",
    },
    {
      icon: CornerUpRight,
      title: "Redirect",
      description:
        "Es un nodo que tiene un nodeId y te lleva a ese punto del experimento (podríamos configurar si esto resetea el contexto o no)",
    },
    {
      icon: Monitor,
      title: "Path",
      description:
        "Es un nodo que agrupa otros nodos que constituyen toda un camino posible dentro del experimento. Tiene un bool para indicar si esos nodos van acompañados de un stepper o no",
    },
    {
      icon: Shuffle,
      title: "Fork",
      description:
        "Nodo que sirve para dividir el flujo en distintos forks de forma aleatoria",
    },
  ],
};
