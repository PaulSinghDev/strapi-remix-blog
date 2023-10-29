import {
  type LoaderFunctionArgs,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data[0]?.name}` },
    { name: "description", content: data[0]?.description },
  ];
};

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const slug = params.slug;
  const products = await fetch(
    `http://127.0.0.1:1337/api/products?filters[slug]=${slug}&populate=*`
  );
  const response = await products.json();
  const structuredData = response?.data?.map((datum: any) => ({
    ...datum.attributes,
    id: datum.id,
  }));
  return structuredData || [];
};

export default function Index() {
  const [product] = useLoaderData<any[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <img
        width={200}
        height={200}
        alt={
          product.featuredImage?.data?.attributes.alternativeText ||
          product.title
        }
        src={`http://127.0.0.1:1337${product.featuredImage?.data?.attributes?.formats?.small.url}`}
      />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        {product.price.currency} {product.price.value}
      </p>
    </div>
  );
}
