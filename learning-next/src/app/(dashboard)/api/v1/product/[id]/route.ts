import { products } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    return Response.json({ message: "Product not found", status: 404 });
  }

  return Response.json({
    message: "Product fetched successfully.",
    status: 200,
    data: product,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, price } = body;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );

  if (productIndex === -1) {
    return Response.json({ message: "Product not found", status: 404 });
  }

  //   products[productIndex].name = name;
  //   products[productIndex].price = price;

  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  return Response.json({
    message: "Product updated successfully.",
    status: 200,
    data: products[productIndex],
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );

  if (productIndex === -1) {
    return Response.json({ message: "Product not found", status: 404 });
  }

  products.splice(productIndex, 1);

  return Response.json({
    message: "Product deleted successfully.",
    status: 200,
  });
}
