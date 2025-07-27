import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/api";
import { PostBody } from "@/components/blog/post-body";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Beitrag nicht gefunden",
    };
  }

  return {
    title: `${post.title} - Sinclear Blog`,
    description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160) || "",
    openGraph: post.featuredImage?.node?.sourceUrl
      ? {
          images: [
            {
              url: post.featuredImage.node.sourceUrl,
              width: 1200,
              height: 630,
              alt: post.featuredImage.node.altText || post.title,
            },
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();

  return slugs.map((slug: any) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <PostBody post={post} />
    </div>
  );
}
