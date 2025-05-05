"use client";
import { NavBarItems } from "@/consts/nav-items";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (src: string) => {
    return pathname === src;
  };

  return (
    <nav className="flex items-center justify-between p-4 text-white">
      <div className="flex space-x-4">
        {NavBarItems.map((item) => (
          <Button
            key={item.title}
            variant="link"
            className="text-primary-foreground hover:text-primary-foreground/80 text-lg"
          >
            <Link
              href={item.src}
              className={cn(
                `flex items-center gap-2`,
                isActive(item.src) && "text-primary underline"
              )}
            >
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
