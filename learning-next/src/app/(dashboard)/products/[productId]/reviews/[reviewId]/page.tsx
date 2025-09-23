import { notFound } from "next/navigation";
import React from "react";

const ProductReview = async ({
  params,
}: {
  params: Promise<{ productId: string; reviewId: string }>;
}) => {
  const { productId, reviewId } = await params;
  if (parseInt(reviewId) > 100) {
    notFound();
  }
  return (
    <div>
      Product id {productId} of review id {reviewId}
    </div>
  );
};

export default ProductReview;
