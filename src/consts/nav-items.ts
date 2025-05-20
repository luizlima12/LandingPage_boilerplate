import { LucideIcon } from "lucide-react";

type NavBarItem = {
  title: string;
  src: string;
  icon?: LucideIcon;
};

/**
 * NavBarItem type
 * @property {string} title - The title of the nav item
 * @property {string} src - The source URL of the nav item
 * @property {LucideIcon} [icon] - The icon of the nav item
 */

const NavBarItems: NavBarItem[] = [
  {
    title: "Home",
    src: "",
  },
  {
    title: "About",
    src: "/about",
  },
  {
    title: "Projects",
    src: "timeline",
  },
  {
    title: "Contact",
    src: "/contact",
  },
];

export { NavBarItems };
