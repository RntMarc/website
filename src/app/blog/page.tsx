import type { Metadata } from "next";
import { getAllPosts } from "@/lib/api";
import { PostCard } from "@/components/blog/post-card";
import { Post } from "@/types/types";

export const metadata: Metadata = {
  title: "Sinclear Blog",
  description: "Ankündigungen, Berichte und Meinungen von Sinclear.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Marc&apos;s Blog</h1>
          <p className="text-xl text-muted-foreground">
            Auch im Geminispace unter gemini://marcrnt.cities.yesterweb.org
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Fehler beim Laden</h2>
            <p className="text-muted-foreground">
              Aktuell können keine Beiträge abgerufen werden. Versuche es später
              erneut!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
