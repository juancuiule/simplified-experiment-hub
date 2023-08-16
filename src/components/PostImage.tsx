import { WordpressPost } from "@/lib/types";
import Image from "next/image";

export default function PostImage(props: {
  post: WordpressPost;
  loading?: "eager" | "lazy";
  defaultImage?: [string, number, number];
}) {
  const {
    post,
    defaultImage = [
      "https://elgatoylacaja.com/images/imagen_no_encontrada.png",
      1920,
      1440,
    ],
  } = props;
  const [url, width, height] = post.image ? post.image : defaultImage;
  return (
    <Image
      loading={props.loading}
      className="w-full transition-all  duration-200 group-hover:scale-105"
      src={url}
      alt=""
      width={200}
      height={(200 / width) * height}
    />
  );
}
