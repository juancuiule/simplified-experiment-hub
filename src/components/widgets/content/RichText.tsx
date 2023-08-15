import { RichTextWidget } from "@/lib/widgets/content";
import ReactMarkdown from "react-markdown";

export default function RichText(props: { widget: RichTextWidget }) {
  const {
    widget: {
      props: { content },
    },
  } = props;
  return <ReactMarkdown>{content}</ReactMarkdown>;
}
