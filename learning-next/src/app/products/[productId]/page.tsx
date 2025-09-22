import React from "react";

const DetailProduct = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const productId = (await params).productId;
  return <div>DetailProduct id is {productId}</div>;
};

export default DetailProduct;
