import {
  type LoaderFunctionArgs,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const slug = params.slug;
  const posts = await fetch(
    `http://127.0.0.1:1337/api/posts?filters[Slug]=${slug}&populate=*`
  );
  const response = await posts.json();
  const structuredData = response?.data?.map((datum: any) => ({
    ...datum.attributes,
    id: datum.id,
  }));
  return structuredData || [];
};

export default function Index() {
  const [post] = useLoaderData<any[]>();

  console.log(post);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <img
        width={200}
        height={200}
        alt={post.FeaturedImage?.data?.attributes.alternativeText || post.Title}
        src={`http://127.0.0.1:1337${post.FeaturedImage?.data?.attributes?.formats?.small.url}`}
      />
      <h1>{post.Title}</h1>
      <Markdown>{post.Content}</Markdown>
    </div>
  );
}
