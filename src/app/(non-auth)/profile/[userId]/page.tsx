import { fetchUser } from "@/api";
import ExperimentsSection from "@/components/ExperimentsSection";
import TeamsSection from "@/components/TeamsSection";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GitHub, Twitter } from "react-feather";

interface Props {
  params: { userId: string };
}

export async function generateMetadata({
  params: { userId },
}: Props): Promise<Metadata> {
  const user = await fetchUser(userId);

  if (user !== null) {
    return {
      title: `Profile | ${user.name}`,
    };
  } else {
    return {
      title: `User not found`,
    };
  }
}

export default async function UserProfile({ params: { userId } }: Props) {
  const user = await fetchUser(userId);

  if (!user) {
    return notFound();
  }

  const { teams, experiments } = user;

  return (
    <div className="flex flex-col items-start gap-6">
      {/* Profile info */}
      <div className="flex items-center justify-center gap-4">
        <div className="rounded-full w-40 h-40 aspect-square overflow-hidden flex justify-center items-center">
          <Image
            src={user.avatar}
            alt="Profile image"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-md text-gray-500 leading-tight">
            {user.organization}
          </p>
          <div className="flex gap-2 mt-2">
            <Twitter size={16} className="stroke-info fill-info" />
            <GitHub size={16} className="stroke-black fill-none" />
          </div>
        </div>
      </div>

      {/* Teams */}
      <TeamsSection teams={teams} />

      {/* Experiments */}
      <ExperimentsSection experiments={experiments} />
    </div>
  );
}
