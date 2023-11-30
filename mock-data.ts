import { CreateTeamBody, SignupBody } from "@/api";

const users: SignupBody[] = [
  {
    email: "juanchi@experiment-hub.com",
    password: "12345678",
    name: "Juan Ignacio Cuiule",
    organization: "Universidad Tecnológica Nacional",
    username: "juancuiule",
    avatar: "https://cdn.experiment-hub.com/team/juan-ignacio.png",
  },
  {
    email: "caro@experiment-hub.com",
    password: "12345678",
    name: "Carolina Baldino",
    organization: "Universidad Tecnológica Nacional",
    username: "carobaldino",
    avatar: "https://cdn.experiment-hub.com/team/carolina.png",
  },
  {
    email: "nadia@experiment-hub.com",
    password: "12345678",
    name: "Nadia Gutierrez",
    organization: "Universidad Tecnológica Nacional",
    username: "nadiagutierrez",
    avatar: "https://cdn.experiment-hub.com/team/nadia.png",
  },
  {
    email: "pedro@experiment-hub.com",
    password: "12345678",
    name: "Pedro Jara",
    organization: "Universidad Tecnológica Nacional",
    username: "pedrojara",
    avatar: "https://cdn.experiment-hub.com/team/pedro.png",
  },
  {
    email: "sebas@experiment-hub.com",
    password: "12345678",
    name: "Sebastian Costas",
    organization: "Universidad Tecnológica Nacional",
    username: "sebastiancostas",
    avatar: "https://cdn.experiment-hub.com/team/sebastian.png",
  },
  {
    email: "vicky@elgatoylacaja.com",
    password: "12345678",
    name: "Vicky Milano",
    organization: "El Gato y La Caja",
    username: "vickymilano",
    avatar: "https://cdn.elgatoylacaja.com/2023/02/Vicky.png",
  },
  {
    email: "javi@elgatoylacaja.com",
    password: "12345678",
    name: "Javier Goldschmidt",
    organization: "El Gato y La Caja",
    username: "javigol",
    avatar: "https://cdn.elgatoylacaja.com/2023/02/Javi.png",
  },
];

const teams: CreateTeamBody[] = [
  {
    name: "Universidad Tecnológica Nacional (FRBA)",
    slug: "utn-frba",
    coverImage: "https://cdn.experiment-hub.com/team/logo-utn.png",
    description:
      "Equipo de investigación de la Universidad Tecnológica Nacional - Facultad Regional Buenos Aires",
    userId: 1,
  },
  {
    name: "El Gato y La Caja",
    slug: "elgatoylacaja",
    coverImage: "https://cdn.elgatoylacaja.com/2023/02/OG_blanco.png",
    description: "Ciencia + Diseño",
    userId: 1,
  },
];

const invites = [
  {
    id: 1,
    members: ["carobaldino", "nadiagutierrez", "pedrojara", "sebastiancostas"],
  },
  {
    id: 2,
    members: ["vickymilano", "javigol"],
  },
];

async function run() {
  // users.forEach((user, i) => {
  //   setTimeout(() => {
  //     fetch("https://api.experiment-hub.com/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(user),
  //     })
  //       .then((res) => res.json())
  //       .then(console.log);
  //   }, i * 400);
  // });
  // teams.forEach((team, i) => {
  //   setTimeout(() => {
  //     fetch("https://api.experiment-hub.com/teams", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(team),
  //     })
  //       .then((res) => res.json())
  //       .then(console.log);
  //   }, i * 400);
  // });
  invites.forEach((invite, i) => {
    setTimeout(() => {
      fetch(`https://api.experiment-hub.com/teams/${invite.id}/members`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members: invite.members }),
      })
        .then((res) => res.json())
        .then(console.log);
    }, i * 400);
  });
}

run();
