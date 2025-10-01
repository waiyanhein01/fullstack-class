import Link from "next/link";
import React from "react";

const InnerF2 = () => {
  return (
    <div>
      <h1 className="">InnerF2 Page</h1>
      <Link href="/f5" className="text-blue-500 underline">
        Go to F5
      </Link>
    </div>
  );
};

export default InnerF2;
