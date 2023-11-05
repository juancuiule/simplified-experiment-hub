import { VideoWidget } from "@/lib/widgets/content";

export default function Video(props: { widget: VideoWidget }) {
  const {
    widget: {
      props: { url, autoplay, muted },
    },
  } = props;
  return <video src={url} autoPlay={autoplay} muted={muted} />;
}
