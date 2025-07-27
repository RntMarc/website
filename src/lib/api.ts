/**
 * WordPress GraphQL API Client
 */

const API_URL = "https://cms.marcrnt.de/graphql";

/**
 * Sendet eine GraphQL-Anfrage an die WordPress API
 */
async function fetchAPI(
  query: string,
  { variables }: { variables?: any } = {}
) {
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

/**
 * Holt alle Blog-Posts für die Übersichtsseite
 */
export async function getAllPosts() {
  const data = await fetchAPI(`
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

  return data?.posts?.edges.map(({ node }) => node) || [];
}

/**
 * Holt einen einzelnen Blog-Post anhand des Slugs
 */
export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
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
    {
      variables: {
        slug,
      },
    }
  );

  return data?.post;
}

/**
 * Holt alle Blog-Post-Slugs für die statische Generierung
 */
export async function getAllPostSlugs() {
  const data = await fetchAPI(`
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

  return data?.posts?.edges.map(({ node }) => node.slug) || [];
}
