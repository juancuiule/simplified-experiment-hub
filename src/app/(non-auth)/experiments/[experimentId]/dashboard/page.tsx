import { experiments } from "@/app/mock-data";
import { Metadata } from "next";
import Link from "next/link";
import {
  Edit3,
  GitBranch,
  Monitor,
  Users
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
  return (
    <ul>
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
    </ul>
  );
}
