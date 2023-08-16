import PostImage from "@/components/PostImage";
import { getNotas } from "@/lib/api";
import Link from "next/link";

// TODO: list real experiments from the backend
export default async function Page(props: { params: { teamId: string } }) {
  const experiments = await getNotas(
    {
      post_type: "labs_experiment",
      posts_per_page: 7,
    },
    true
  );

  return (
    <section className="flex flex-col max-w-7xl mx-auto">
      <h2 className="text-white mb-10 text-3xl font-bold">
        Experimentos del equipo: {props.params.teamId}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {experiments.map((post) => {
          return (
            <Link
              href={`/experiments/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              key={post.id_post}
            >
              <article className="group flex cursor-pointer flex-col gap-2 rounded p-4 hover:bg-gray-200/5">
                <div className="w-full overflow-hidden rounded">
                  <PostImage post={post} />
                </div>
                <h2 className="text-white text-lg font-medium">{post.title}</h2>
                <p className="text-white text-xs">
                  {post.metadata.description}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
