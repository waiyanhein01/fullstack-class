// import { NextResponse as Response } from "next/server";
import { NextRequest } from "next/server";
import { products } from "./data";
import { cookies, headers } from "next/headers";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const query = searchParams.get("query");
//   // const name = searchParams.get("name");

//   const filterProducts = query
//     ? products.filter((product) =>
//         product.name.toLowerCase().includes((query || "").toLowerCase())
//       )
//     : products;

//   return Response.json({
//     message: "Products filtered successfully.",
//     status: 200,
//     data: filterProducts,
//   });
// }

export async function GET(request: NextRequest) {
  // const header = request.headers.get("Authorization");
  // console.log("header", header);

  // const requestHeaders = new Headers(request.headers);
  // console.log("header", requestHeaders.get("Authorization"));

  const requestHeaders = await headers(); // this is next.js build in function
  console.log(requestHeaders.get("Authorization"));

  // const requestCookies = request.headers.get("theme");
  // console.log("cookies", requestCookies);

  const requestCookies = await cookies(); // this is next.js build in function
  requestCookies.set("age", "22");
  console.log("cookies", requestCookies.get("age"));

  return new Response("<h1>Headers logged in the server console</h1>", {
    headers: {
      "Content-Type": "text/html",
      "set-Cookie": "theme=dark",
    },
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
