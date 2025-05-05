"use client";
import { Button } from "@/components/ui/button";
import { NavBarItems } from "@/consts/nav-items";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const NavBarLink = () => {
  const pathname = usePathname();
  const isActive = (src: string) => {
    return pathname === src;
  };

  return (
    <>
      {NavBarItems.map((item) => (
        <Button
          key={item.title}
          variant="link"
          className="text-primary-foreground hover:text-primary/40 text-lg"
        >
          <Link
            href={item.src}
            className={cn(
              `flex items-center gap-2`,
              isActive(item.src) && "text-primary underline "
            )}
          >
            {item.title}
          </Link>
        </Button>
      ))}
    </>
  );
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between p-4 text-white">
      <div className="space-x-4 hidden md:flex">
        <NavBarLink />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="md:hidden">
            <Menu className="size-8" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            <NavBarLink />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
