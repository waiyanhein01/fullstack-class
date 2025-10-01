import Link from "next/link";
import React from "react";

const F2 = () => {
  return (
    <div>
      <h1>F2 Page - Intercepting Routes</h1>
      <Link href="/f4" className="text-blue-500 underline">
        Go to F4
      </Link>
    </div>
  );
};

export default F2;
