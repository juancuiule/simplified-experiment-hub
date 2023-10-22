import { experiments, teams } from "@/app/mock-data";
import ExperimentsSection from "@/components/ExperimentsSection";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
interface Props {
  params: { teamId: string };
}

export async function generateMetadata({
  params: { teamId },
}: Props): Promise<Metadata> {
  const { name } = teams.find((t) => t.slug === teamId)!;
  return {
    title: `Team | ${name}`,
  };
}

export default function Team({ params: { teamId } }: Props) {
  const { members, background, name } = teams.find((t) => t.slug === teamId)!;

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
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            ipsam quo mollitia, et praesentium nihil
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-2xl font-semibold">Members</h2>
        <div className="grid grid-cols-12 gap-4">
          {members.map((member) => {
            return (
              <Link
                href={`/profile/${member.slug}`}
                className="col-span-3 lg:col-span-2 xl:col-span-1 flex flex-col cursor-pointer flex-1 justify-start items-center gap-2"
                key={member.slug}
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
      <ExperimentsSection
        experiments={experiments.filter((e) => e.team.slug === teamId)}
      />
    </div>
  );
}
