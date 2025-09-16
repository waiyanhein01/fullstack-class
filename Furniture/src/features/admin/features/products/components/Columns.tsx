import { Image } from "@/types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Products = {
  id: number;
  name: string;
  description: string;
  price: string;
  discount: string;
  inventory: number;
  status: string;
  images: Image[];
};
const imgUrl = import.meta.env.VITE_API_URL;

export const Columns: ColumnDef<Products>[] = [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,

    enableHiding: false,
  },

  {
    accessorKey: "images",

    header: "Image",

    cell: ({ row }) => {
      const images = row.getValue("images") as Image[];

      return (
        <img
          src={imgUrl + images[0].path}
          alt="product image"
          // src="../../../../../../images/product-1.png"

          loading="lazy"
          decoding="async"
          className="size-14 rounded-full object-cover object-center"
        />
      );
    },
  },

  {
    accessorKey: "name",

    header: "Name",

    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "description",

    header: "Description",

    cell: ({ row }) => (
      <div className="line-clamp-1 w-[200px]">
        {row.getValue("description")}
      </div>
    ),
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`${row.getValue("status") === "ACTIVE" ? "border-green-400" : "border-red-400"} capitalize`}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },

  {
    accessorKey: "inventory",

    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center justify-end"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inventory
          <ArrowUpDown className="ml-1 size-4" />
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="text-right lowercase">{row.getValue("inventory")}</div>
    ),
  },

  {
    accessorKey: "price",

    header: () => <div className="text-right">Price</div>,

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",

        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "discount",

    header: () => <div className="text-right">Discount</div>,

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("discount"));

      // Format the amount as a dollar amount

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",

        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",

    enableHiding: false,

    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>

              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Edit Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
