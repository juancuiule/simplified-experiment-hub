import { AudioWidget } from "@/lib/widgets/content";

export default function Audio(props: { widget: AudioWidget }) {
  const { widget } = props;
  return <audio src={widget.props.url}></audio>;
}
