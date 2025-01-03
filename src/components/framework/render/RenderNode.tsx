import { FrameworkView } from "@/lib";
import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkNode } from "@/lib/nodes";
import { Loader } from "react-feather";
import { RenderExperimentStep } from "./RenderExperimentStep";

export function RenderNode(props: {
  node: FrameworkNode;
  views: FrameworkView[];
}) {
  const { node, views } = props;

  const data = useExperimentStore((s) => s.data);

  switch (node.nodeType) {
    case "start":
    case "initial-state":
    case "checkpoint": {
      return (
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      );
    }
    case "experiment-step": {
      return <RenderExperimentStep key={node.id} node={node} views={views} />;
    }
    case "finish": {
      return (
        <div>
          <h1>Finish</h1>
          <p>Experiment finished</p>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      );
    }
    case "noop":
    case "redirect": {
      return <></>;
    }
    default: {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>type</th>
                <th>family</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.node.id}</td>
                <td>{props.node.nodeType}</td>
                <td>{props.node.nodeFamily}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}
