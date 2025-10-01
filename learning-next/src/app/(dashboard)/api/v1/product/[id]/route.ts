import { products } from "../data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return Response.json({ message: "Product not found", status: 404 });
  }
  return Response.json({
    message: "Product fetched successfully.",
    status: 200,
    data: product,
  });
}
