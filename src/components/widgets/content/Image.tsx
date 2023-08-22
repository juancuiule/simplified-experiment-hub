import { ImageWidget } from "@/lib/widgets/content";

export default function Image(props: { widget: ImageWidget }) {
  const { widget } = props;
  const { url, alt } = widget.props;

  if (typeof url === "string") {
    return <img src={url} alt={alt} />;
  } else {
    return (
      <>
        <img src={url.mobile} alt={alt} className="md:hidden" />
        <img src={url.desktop} alt={alt} className="hidden md:block" />
      </>
    );
  }
}
