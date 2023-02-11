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
  console.log(`${process.env.STRAPI_URL_BASE}/api/posts`);
  const request = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts`);
  const response: { data: ApiPost[] } = await request.json();
  return response.data.map((post) => ({
    title: post.attributes.Title,
    slug: post.attributes.Slug,
  }));
};
