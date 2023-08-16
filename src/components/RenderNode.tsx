import { FrameworkNode } from "@/lib/nodes";
import { RenderExperimentStep } from "./RenderExperimentStep";

export function RenderNode(props: { node: FrameworkNode }) {
  const { node } = props;

  switch (node.nodeType) {
    case "experiment-step": {
      return <RenderExperimentStep key={node.id} node={node} />;
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
