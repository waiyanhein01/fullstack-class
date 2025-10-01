// import { NextResponse as Response } from "next/server";
import { products } from "./data";

export async function GET() {
  return Response.json({
    message: "Products fetched successfully.",
    status: 200,
    data: products,
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
