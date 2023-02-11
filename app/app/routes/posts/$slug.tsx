import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/models/post.server";
import { getPosts } from "~/models/post.server";

export const loader = async ({
  params,
}: LoaderArgs): Promise<TypedResponse<{ slug?: string; post?: Post }>> => {
  const posts = await getPosts();
  return json({
    slug: params.slug,
    post: posts.find((post) => post.slug === params.slug),
  });
};

const PostSlug = () => {
  const { post } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>{post?.title}</h1>
      <p>{`/posts/${post?.slug}`}</p>
    </main>
  );
};

export default PostSlug;
