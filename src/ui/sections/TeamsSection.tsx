import { UserTeam } from "@/api";
import Link from "next/link";

interface Props {
  teams: UserTeam[];
}

export default function TeamsSection({ teams }: Props) {
  return (
    <section className="flex flex-col w-full gap-4">
      <h2 className="text-2xl font-semibold">Teams</h2>
      <div className="grid grid-cols-12 gap-4">
        {teams.map((team) => {
          const membersToShow = team.users.slice(0, 3);
          const membersDiff = team.users.length - membersToShow.length;
          return (
            <Link
              href={`/teams/${team.slug}`}
              className="col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col cursor-pointer"
              key={team.slug}
            >
              <div
                className="aspect-video h-40 w-full bg-cover bg-center rounded-t-md relative group"
                style={{
                  backgroundImage: `url(${team.coverImage})`,
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0 12px 5px inset",
                }}
              >
                <div className="absolute right-0 bottom-0 p-1 flex justify-end items-center w-full bg-gradient-to-b from-transparent to-black/50 transition-all">
                  {membersToShow.map((member, i, m) => (
                    <div
                      key={member.name}
                      className={`${
                        i === m.length - 1 ? "mr-0" : "-mr-2"
                      } border border-black w-8 h-8 aspect-square rounded-full bg-cover bg-center`}
                      style={{
                        backgroundImage: `url(${member.avatar})`,
                      }}
                    />
                  ))}
                  {membersDiff > 0 && (
                    <div className="w-6 opacity-100 group-hover:opacity-100 group-hover:w-6 h-6 flex justify-center items-center font-mono text-xs transition-all">
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
    </section>
  );
}
