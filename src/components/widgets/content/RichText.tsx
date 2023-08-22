import { RichTextWidget } from "@/lib/widgets/content";
import ReactMarkdown from "react-markdown";

export default function RichText(props: { widget: RichTextWidget }) {
  const {
    widget: {
      props: { content },
    },
  } = props;
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-4xl font-bold" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-3xl font-bold" />
        ),
        p: ({ node, ...props }) => <p className="text-gray-500" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
