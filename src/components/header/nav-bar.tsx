"use client";
import { Button } from "@/components/ui/button";
import { NavBarItems } from "@/consts/nav-items";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
