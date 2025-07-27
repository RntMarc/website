import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PostBodyProps {
  post: {
    title: string;
    content: string;
    date: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    author?: {
      node: {
        name: string;
        avatar?: {
          url: string;
        };
      };
    };
    categories?: {
      edges: Array<{
        node: {
          name: string;
          slug: string;
        };
      }>;
    };
  };
}

export function PostBody({ post }: PostBodyProps) {
  const { title, content, date, featuredImage, author, categories } = post;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4 md:text-4xl">{title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {author?.node && (
              <>
                <Avatar>
                  {author.node.avatar?.url && (
                    <AvatarImage
                      src={author.node.avatar.url || "/placeholder.svg"}
                      alt={author.node.name}
                    />
                  )}
                  <AvatarFallback>{author.node.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{author.node.name}</div>
                  <time
                    className="text-sm text-muted-foreground"
                    dateTime={date}
                  >
                    {formatDate(date)}
                  </time>
                </div>
              </>
            )}
          </div>

          {categories!.edges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories!.edges.map(({ node }) => (
                <Badge key={node.slug} variant="secondary">
                  {node.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {featuredImage?.node?.sourceUrl && (
          <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
            <Image
              src={featuredImage.node.sourceUrl || "/placeholder.svg"}
              alt={featuredImage.node.altText || title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        )}
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
