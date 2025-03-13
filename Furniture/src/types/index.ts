export interface NavItems {
  title: string;
  href?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItems {
  card?: NavItemWithChildren[];
  menu?: NavItemWithChildren[];
}

export type MainNavItems = NavItemWithChildren;
