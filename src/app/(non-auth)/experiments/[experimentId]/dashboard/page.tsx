import { experiments } from "@/app/mock-data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Edit3,
  GitBranch,
  Monitor,
  Settings,
  Users,
} from "react-feather";

interface Props {
  params: { experimentId: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { name } = experiments.find(
    (e) => e.slug === props.params.experimentId
  )!;

  return {
    title: `Dashboard | ${name}`,
  };
}

export default function ExperimentDashboard({ params }: Props) {
  const { name, background } = experiments.find(
    (e) => e.slug === params.experimentId
  )!;
  return (
    <div className="flex flex-col gap-6">
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
      <ul>
        <li>
          <Link
            href={`/experiments/${params.experimentId}/analytics`}
            prefetch
            className="flex gap-2 items-center"
          >
            <Activity size={18} /> <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiments/${params.experimentId}/edit`}
            prefetch
            className="flex gap-2 items-center"
          >
            <Edit3 size={18} /> <span>Edit</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiments/${params.experimentId}/flow`}
            prefetch
            className="flex gap-2 items-center"
          >
            <GitBranch size={18} /> <span>Flow</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiments/${params.experimentId}/views`}
            prefetch
            className="flex gap-2 items-center"
          >
            <Monitor size={18} /> <span>Views</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiments/${params.experimentId}/data`}
            prefetch
            className="flex gap-2 items-center"
          >
            <Users size={18} /> <span>Participants and data</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiments/${params.experimentId}/settings`}
            prefetch
            className="flex gap-2 items-center"
          >
            <Settings size={18} /> <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
