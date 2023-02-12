import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Page } from "~/models/page.server";
import { getPages } from "~/models/page.server";

export const loader = async ({
  params,
}: LoaderArgs): Promise<TypedResponse<{ slug?: string; page?: Page }>> => {
  const pages = await getPages();
  console.log(pages);
  return json({
    slug: params.slug,
    page: pages.find((page) => page.slug === params.slug),
  });
};

const PageSlug = () => {
  const { page } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>{page?.title}</h1>
      <p>{`/${page?.slug}`}</p>
    </main>
  );
};

export default PageSlug;
