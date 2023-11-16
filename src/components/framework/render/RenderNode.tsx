import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkNode } from "@/lib/nodes";
import CustomView from "./CustomView";
import { RenderExperimentStep } from "./RenderExperimentStep";
import { FrameworkView } from "@/lib";

export function RenderNode(props: {
  node: FrameworkNode;
  views: FrameworkView[];
}) {
  const { node, views } = props;

  const data = useExperimentStore((s) => s.data);

  switch (node.nodeType) {
    case "experiment-step": {
      return <RenderExperimentStep key={node.id} node={node} views={views} />;
    }
    case "custom-view": {
      return <CustomView slug={node.props.slug} />;
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
