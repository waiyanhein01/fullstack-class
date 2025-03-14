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

export type Product = {
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

export type Post = {
  id: string;
  author: string;
  title: string;
  content:string;
  image: string;
  body: string;
  updated_at: string;
  tags: string[];
}
