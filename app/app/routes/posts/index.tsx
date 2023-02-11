import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({ posts: await getPosts() });
};

const Posts = () => {
  const { posts } = useLoaderData<typeof loader>();
  console.log(posts);
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Link to={`/posts/${post.slug}`} key={post.slug}>
          {post.title}
        </Link>
      ))}
    </main>
  );
};

export default Posts;
