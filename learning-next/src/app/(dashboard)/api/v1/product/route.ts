// import { NextResponse as Response } from "next/server";
import { NextRequest } from "next/server";
import { products } from "./data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  // const name = searchParams.get("name");

  const filterProducts = query
    ? products.filter((product) =>
        product.name.toLowerCase().includes((query || "").toLowerCase())
      )
    : products;

  return Response.json({
    message: "Products filtered successfully.",
    status: 200,
    data: filterProducts,
  });
}

export async function POST(request: Request) {
  const product = await request.json();
  const newProduct = {
    id: products.length + 1,
    name: product.name,
    price: product.price,
  };
  products.push(newProduct);

  return Response.json({
    message: "Product created successfully.",
    status: 201,
  });
}
