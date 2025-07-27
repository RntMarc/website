export interface Author {
  name: string;
  avatar: {
    url: string;
  };
}

export interface Category {
  name: string;
  slug: string;
}

export interface FeaturedImage {
  sourceUrl: string;
  altText: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: FeaturedImage;
  };
  author: {
    node: Author;
  };
  categories: {
    edges: {
      node: Category;
    }[];
  };
}
