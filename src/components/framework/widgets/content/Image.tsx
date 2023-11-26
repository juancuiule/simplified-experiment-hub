import { ImageWidget } from "@/lib/widgets/content";

export default function Image(props: { widget: ImageWidget }) {
  const { widget } = props;
  const { url, alt } = widget.props;

  return <img src={url} alt={alt} />;
}
