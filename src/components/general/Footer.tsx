import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-left">
            <p className="text-sm text-muted-foreground">
              © Sinclear 2025. Mehr als nur Zinnchlorid.
            </p>
          </div>
          <div className="flex justify-start md:justify-end space-x-4">
            <Link
              href="https://bsky.app/profile/marcrnt.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Bluesky"
            >
              <div className="relative h-5 w-5">
                <Image
                  src="/icons/bluesky-black.svg"
                  alt="Bluesky"
                  width={20}
                  height={20}
                  className="dark:hidden"
                />
                <Image
                  src="/icons/bluesky-white.svg"
                  alt="Bluesky"
                  width={20}
                  height={20}
                  className="hidden dark:block"
                />
              </div>
            </Link>
            <Link
              href="https://sueden.social/@MarcRnt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Mastodon"
            >
              <div className="relative h-5 w-5">
                <Image
                  src="/icons/mastodon-black.svg"
                  alt="Mastodon"
                  width={20}
                  height={20}
                  className="dark:hidden"
                />
                <Image
                  src="/icons/mastodon-white.svg"
                  alt="Mastodon"
                  width={20}
                  height={20}
                  className="hidden dark:block"
                />
              </div>
            </Link>
            <Link
              href="https://pixelfed.social/@MarcRnt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Pixelfed"
            >
              <div className="relative h-5 w-5">
                <Image
                  src="/icons/pixelfed-black.svg"
                  alt="Pixelfed"
                  width={20}
                  height={20}
                  className="dark:hidden"
                />
                <Image
                  src="/icons/pixelfed-white.svg"
                  alt="Pixelfed"
                  width={20}
                  height={20}
                  className="hidden dark:block"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
