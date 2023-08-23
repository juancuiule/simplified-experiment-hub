import { Context } from "@/lib/flow/state";
import { RenderNode } from "./RenderNode";

const RenderState = (props: { state: Context["state"] }) => {
  const { state } = props;

  switch (state.type) {
    case "in-node": {
      return <RenderNode node={state.node} />;
    }
    case "in-branch": {
      const { branch_state } = state;
      return <RenderState state={branch_state} />;
    }
    case "in-path": {
      const { path_state } = state;
      return <RenderState state={path_state} />;
    }
    default:
      break;
  }

  return <div></div>;
};

export default RenderState;
