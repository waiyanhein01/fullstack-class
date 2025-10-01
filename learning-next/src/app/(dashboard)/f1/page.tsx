import Link from "next/link";
import React from "react";

const F1 = () => {
  return (
    <div>
      <h1>F1 Page - Intercepting Routes</h1>
      <Link href="/f1/f2" className="text-blue-500 underline">
        Go to F2
      </Link>
      <Link href="/f3" className="text-blue-500 underline">
        Go to F3
      </Link>
      <Link href="/f1/f2/inner-f2" className="text-blue-500 underline">
        Go to Inner F2
      </Link>
    </div>
  );
};

export default F1;
