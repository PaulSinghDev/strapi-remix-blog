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
  const pages = await fetch("http://127.0.0.1:1337/api/pages");

  // Get pages
  const posts = await fetch("http://127.0.0.1:1337/api/posts");

  // Get products
  const products = await fetch("http://127.0.0.1:1337/api/products");

  // Parse responses
  const postsResponse = await posts.json();
  const pagesResponse = await pages.json();
  const productsResponse = await products.json();
  const siteInfoResponse = await info.json();

  // Structure data
  const structuredPostData = postsResponse?.data?.map((datum: any) => ({
    ...datum.attributes,
    id: datum.id,
  }));

  // Structured page data
  const structuredPageData = pagesResponse?.data?.map((datum: any) => ({
    ...datum.attributes,
    id: datum.id,
  }));

  // Structured product data
  const structuredProductData = productsResponse?.data?.map((datum: any) => ({
    ...datum.attributes,
    id: datum.id,
  }));

  // Return response
  return {
    siteInfo: { name: siteInfoResponse?.data?.attributes?.SiteName },
    pages: structuredPageData || [],
    posts: structuredPostData || [],
    products: structuredProductData || [],
  };
};

export default function Index() {
  const loaderData = useLoaderData<{
    siteInfo: any;
    pages: any[];
    posts: any[];
    products: any[];
  }>();
  console.log(loaderData);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to {loaderData?.siteInfo?.name}</h1>
      <h2>Pages</h2>
      <ul>
        {loaderData?.pages?.map?.((page) => (
          <li key={page.slug}>
            <Link to={`/${page.slug}`} title={page.title}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Posts</h2>
      <ul>
        {loaderData?.posts?.map?.((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} title={post.title}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Products</h2>
      <ul>
        {loaderData?.products?.map?.((product) => (
          <li key={product.slug}>
            <Link to={`/store/${product.slug}`} title={product.name}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
