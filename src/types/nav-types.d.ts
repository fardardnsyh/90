import Icons from "../utils/icons";

type NavLink = {
  title: string;
  href: string;
  disabled?: boolean;
};

//SidebarNavItem is a union type that consists of two possible shapes

type SidebarNavItem = {
  title: string; // Required: The title of the navigation item
  disabled?: boolean; // Optional: Indicates whether the item is disabled
  external?: boolean; // Optional: Indicates whether the link is external
  icon?: keyof typeof Icons; // Optional: The icon associated with the navigation item
} & (
  | {
      href: string; // Required if items are not present: The URL the item links to
      items?: never; // Should not have `items` property if `href` is present
    }
  | {
      href?: string; // Optional: The URL the item links to
      items: NavLink[]; // Required if href is not present: An array of sub-navigation items
    }
);

// SidebarNavItem is either (title, disabled, external, icon, href) or (title, disabled, external, icon, items)
