type ApiPost = {
  attributes: {
    Title: string;
    Slug: string;
  };
};

export type Post = {
  title: string;
  slug: string;
};

export const getPosts = async (): Promise<Post[]> => {
  console.log(`Bearer ${process.env.STRAPI_API_TOKEN}`);
  const request = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });
  const response: { data: ApiPost[] } = await request.json();
  console.log(response);
  return response.data.map((post) => ({
    title: post.attributes.Title,
    slug: post.attributes.Slug,
  }));
};
