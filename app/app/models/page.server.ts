type ApiPage = {
  attributes: {
    Title: string;
    Slug: string;
  };
};

export type Page = {
  title: string;
  slug: string;
};

export const getPages = async (): Promise<Page[]> => {
  const request = await fetch(`${process.env.STRAPI_URL_BASE}/api/pages`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });
  const response: { data: ApiPage[] } = await request.json();
  return response.data.map((page) => ({
    title: page.attributes.Title,
    slug: page.attributes.Slug,
  }));
};
