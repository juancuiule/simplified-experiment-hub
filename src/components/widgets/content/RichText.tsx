import Markdown from "@/components/Markdown";
import { RichTextWidget } from "@/lib/widgets/content";

export default function RichText(props: { widget: RichTextWidget }) {
  const {
    widget: {
      props: { content },
    },
  } = props;
  return <Markdown content={content} />;
}
