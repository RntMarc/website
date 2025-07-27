import { Post } from "@/types/types";

const API_URL = "https://cms.marcrnt.de/graphql";

async function fetchAPI<TData>(
  query: string,
  variables: { [key: string]: unknown } = {}
): Promise<TData> {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getAllPosts(): Promise<Post[]> {
  type Response = {
    posts: {
      edges: {
        node: Post;
      }[];
    };
  };

  const data = await fetchAPI<Response>(`
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.posts.edges.map(({ node }) => node);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  type Response = {
    post: Post | null;
  };

  const data = await fetchAPI<Response>(
    `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    }
  `,
    { slug }
  );

  return data.post;
}

export async function getAllPostSlugs(): Promise<string[]> {
  type Response = {
    posts: {
      edges: {
        node: {
          slug: string;
        };
      }[];
    };
  };

  const data = await fetchAPI<Response>(`
    query AllPostSlugs {
      posts(first: 100) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  return data.posts.edges.map(({ node }) => node.slug);
}
