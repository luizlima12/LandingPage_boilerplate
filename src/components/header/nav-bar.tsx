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

const NavBarLink: React.FC<{
  setOpen?: (data: boolean) => void;
  open?: boolean;
}> = ({ setOpen, open }) => {
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
          className="text-primary md:text-primary-foreground md:hover:text-popover-foreground text-lg"
          onClick={() => {
            if (setOpen && open) setOpen(!open);
          }}
        >
          <Link
            href={item.src}
            className={cn(
              `flex items-center gap-2`,
              isActive(item.src) && "text-secondary-foreground underline "
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
          <Button className="md:hidden shadow-none hover:text-zinc-300 ">
            <Menu className="size-8" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-74">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            <NavBarLink setOpen={setOpen} open={open} />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
