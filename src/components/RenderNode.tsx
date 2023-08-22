import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkNode } from "@/lib/nodes";
import { RenderExperimentStep } from "./RenderExperimentStep";

export function RenderNode(props: { node: FrameworkNode }) {
  const { node } = props;

  const data = useExperimentStore((s) => s.data);

  switch (node.nodeType) {
    case "experiment-step": {
      return <RenderExperimentStep key={node.id} node={node} />;
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
