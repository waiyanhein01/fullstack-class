import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="">Welcome Home</h1>
      <div className="flex gap-4">
        <Link href="/article/breaking-news123?lang=en">English</Link>
        <Link href={"/article/breaking-news123?lang=mm"}>Myanmar</Link>
        <Link href={"/article/breaking-news123?lang=fr"}>France</Link>
      </div>
    </div>
  );
};

export default Home;
