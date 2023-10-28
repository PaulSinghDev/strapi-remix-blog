import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.siteInfo?.name}` },
    { name: "description", content: `This is ${data?.siteInfo?.name}!` },
  ];
};

export const loader: LoaderFunction = async () => {
  // Get site info
  const info = await fetch("http://127.0.0.1:1337/api/site-info");

  // Get posts
  const posts = await fetch("http://127.0.0.1:1337/api/posts");

  // Parse responses
  const response = await posts.json();
  const siteInfoResponse = await info.json();

  // Structure data
  const structuredData = response?.data?.map((datum: any) => ({
    ...datum.attributes,
    id: datum.id,
  }));

  // Return response
  return {siteInfo: {name: siteInfoResponse?.data?.attributes?.SiteName},posts: structuredData || []};
};

export default function Index() {
  const loaderData = useLoaderData<{siteInfo: any, posts: any[]}>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to {loaderData?.siteInfo?.name}</h1>
      <ul>
        {loaderData?.posts?.map?.((post) => (
          <li key={post.Slug}>
            <Link to={`/${post.Slug}`} title={post.Title}>
              {post.Title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
