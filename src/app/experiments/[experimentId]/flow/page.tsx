import Card from "@/components/Card";
import {
  CornerUpRight,
  Database,
  Flag,
  GitBranch,
  HelpCircle,
  Monitor,
  Play
} from "react-feather";

export default function Page({ params }: { params: { experimentId: string } }) {
  return (
    <div className="flex flex-row flex-1 w-full mx-auto h-screen gap-2.5 p-6">
      <div className="flex-1 h-full bg-gray-100 p-3 rounded-md">
        <h1>Experiment {params.experimentId} - Flow</h1>
      </div>
      <div className="flex flex-col gap-2.5 max-h-full overflow-y-scroll pb-2.5">
        <Card
          icon={<Monitor size={16} />}
          title={"Experiment Step"}
          description={""}
        />
        <Card
          icon={<Monitor size={16} />}
          title={"View Node"}
          description={""}
        />
        <Card icon={<Play size={16} />} title={"Start"} description={""} />
        <Card
          icon={<Database size={16} />}
          title={"Checkpoint"}
          description={""}
        />
        <Card icon={<></>} title={"NoOp"} description={""} />
        <Card icon={<Flag size={16} />} title={"Finish"} description={""} />
        <Card
          icon={<GitBranch size={16} />}
          title={"Branch"}
          description={""}
        />
        <Card
          icon={<HelpCircle size={16} />}
          title={"Questionnaire"}
          description={""}
        />
        <Card
          icon={<CornerUpRight size={16} />}
          title={"Redirect"}
          description={""}
        />
        <Card icon={<></>} title={"Path"} description={""} />
      </div>
    </div>
  );
}
