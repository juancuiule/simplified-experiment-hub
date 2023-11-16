import { Context } from "@/lib/flow/state";
import { RenderNode } from "./RenderNode";

const RenderState = (props: Pick<Context, "views" | "state">) => {
  const { state, views } = props;

  switch (state.type) {
    case "in-node": {
      return <RenderNode node={state.node} views={views} />;
    }
    case "in-branch": {
      const { branch_state } = state;
      return <RenderState state={branch_state} views={views} />;
    }
    case "in-path": {
      const { path_state } = state;
      return <RenderState state={path_state} views={views} />;
    }
    default:
      break;
  }

  return <div></div>;
};

export default RenderState;
