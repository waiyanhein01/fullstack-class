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

// export type Image = {
//   id: number;
//   path: string;
// };

export type product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};
