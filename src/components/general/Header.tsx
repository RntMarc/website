"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Startseite", href: "/" },
  { name: "Blog", href: "/blog" },
  {
    name: "Social Media",
    href: "/social",
    submenu: [
      {
        name: "Bluesky",
        href: "https://bsky.app/profile/marcrnt.de",
      },
      {
        name: "Mastodon",
        href: "https://sueden.social/@MarcRnt",
      },
    ],
  },
  {
    name: "Bilder",
    href: "/pics",
    submenu: [
      { name: "Pixelfed", href: "https://pixelfed.social/@MarcRnt" },
      { name: "Unsplash", href: "" },
      { name: "Pexels", href: "" },
      { name: "Pixabay", href: "" },
      { name: "EyeEm", href: "" },
      { name: "DeviantArt", href: "" },
      { name: "Tumblr", href: "" },
    ],
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              {/* <span className="text-white font-bold text-lg">S</span> */}
              <Image
                src={"/marc.png"}
                alt={"Marc"}
                className="w-10 h-10 rounded-lg flex justify-center"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl">MarcRnt</span>
              {/* <span className="text-xs text-muted-foreground hidden sm:block">
                Mehr als nur Zinnchlorid
              </span>*/}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="flex">
                  {item.submenu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="font-medium px-4 py-2 h-auto"
                        >
                          {item.name}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.submenu.map((subItem) => (
                          <DropdownMenuItem key={subItem.name} asChild>
                            <Link
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-medium text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-accent"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Theme umschalten</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Hell
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dunkel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-2 py-1 text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
