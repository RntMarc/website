import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
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

export function PostCard({ post }: PostCardProps) {
  const { slug, title, excerpt, date, featuredImage, author, categories } =
    post;

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        {featuredImage?.node?.sourceUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={featuredImage.node.sourceUrl || "/placeholder.svg"}
              alt={featuredImage.node.altText || title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent className="pb-2 mb-2">
          <div
            className="text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-5 border-t">
          <div className="flex items-center space-x-2">
            {author?.node && (
              <>
                <Avatar className="w-6 h-6">
                  {author.node.avatar?.url && (
                    <AvatarImage
                      src={author.node.avatar.url || "/placeholder.svg"}
                      alt={author.node.name}
                    />
                  )}
                  <AvatarFallback>{author.node.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {author.node.name}
                </span>
              </>
            )}
          </div>
          <time className="text-sm text-muted-foreground" dateTime={date}>
            {formatDate(date)}
          </time>
        </CardFooter>
      </Card>
    </Link>
  );
}
