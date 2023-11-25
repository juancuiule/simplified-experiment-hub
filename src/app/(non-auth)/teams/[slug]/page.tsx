import { API } from "@/api";
import ExperimentsSection from "@/ui/sections/ExperimentsSection";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const team = await API.teams.fetchBySlug(slug);

  if (team !== null) {
    return {
      title: `Team | ${team.name}`,
    };
  } else {
    return {
      title: `Team not found`,
    };
  }
}

export default async function Team({ params: { slug } }: Props) {
  const team = await API.teams.fetchBySlug(slug);

  if (!team) {
    return notFound();
  }

  const {
    name,
    description,
    coverImage: background,
    users: members = [],
    experiments = [],
  } = team;

  return (
    <div className="flex flex-col w-full gap-6">
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
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-2xl font-semibold">Members</h2>
        <div className="grid grid-cols-12 gap-4">
          {members.map((member) => {
            return (
              <Link
                href={`/users/${member.username}`}
                className="col-span-3 lg:col-span-2 xl:col-span-1 flex flex-col cursor-pointer flex-1 justify-start items-center gap-2"
                key={member.username}
              >
                <div className="w-4/5 aspect-square flex justify-center items-center rounded-full overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={200}
                    height={200}
                  />
                </div>
                <span className="text-sm text-center font-semibold">
                  {member.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <ExperimentsSection experiments={experiments} />
    </div>
  );
}
