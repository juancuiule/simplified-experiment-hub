import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function Markdown(props: {
  content: string;
  disallowedElements?: string[];
  allowedElements?: string[];
}) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      allowedElements={props.allowedElements}
      disallowedElements={props.disallowedElements}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-4xl font-bold" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-3xl font-bold" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-2xl font-bold" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className="border-l-4 border-gray-300 pl-4 text-gray-500"
          />
        ),
        p: ({ node, ...props }) => <p className="text-gray-500" {...props} />,
        code: ({ node, ...props }) => (
          <code
            {...props}
            className="bg-gray-100 text-gray-800 rounded p-1 text-sm whitespace-break-spaces"
          />
        ),
        pre: ({ node, ...props }) => (
          <pre
            {...props}
            className="bg-gray-100 text-gray-800 rounded text-sm [&>code]:block [&>code]:bg-transparent"
          />
        ),
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}
