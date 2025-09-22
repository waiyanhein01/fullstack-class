"use client";

import { usePathname } from "next/navigation";
import React from "react";

const NotFound = () => {
  const pathname = usePathname();
  const productId = pathname.split("/")[2];
  const reviewId = pathname.split("/")[4];
  return (
    <div>
      <h1>
        Review {reviewId} of Product {productId} is not found
      </h1>
    </div>
  );
};

export default NotFound;
