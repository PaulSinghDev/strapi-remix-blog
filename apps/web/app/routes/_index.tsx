import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const posts = await fetch("http://127.0.0.1:1337/api/posts");
  const response = await posts.json();
  const structuredData = response?.data?.map((datum) => ({
    ...datum.attributes,
    id: datum.id,
  }));
  return structuredData || [];
};

export default function Index() {
  const loaderData = useLoaderData<any[]>();
  console.log(loaderData);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {loaderData?.map?.((post) => (
          <li key={post.Slug}>
            <Link to={`/posts/${post.Slug}`} title={post.Title}>
              {post.Title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
