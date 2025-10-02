export const dynamic = "force-static";
export const revalidate = 10; // Revalidate every 10 seconds

export async function GET() {
  return Response.json({
    message: "Times API v1 endpoint",
    status: 200,
    data: new Date().toLocaleTimeString(),
  });
}
