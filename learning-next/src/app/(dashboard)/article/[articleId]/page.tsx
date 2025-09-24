import Link from "next/link";
import React from "react";

const ArticleDetail = async ({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "mm" | "fr" }>;
}) => {
  const { articleId } = await params;
  const { lang } = await searchParams;
  return (
    <div>
      <h1>Reading article {articleId}</h1>
      <h2>Language: {lang}</h2>

      <Link href={`/article/${articleId}?lang=en`}>English</Link>
      <Link href={`/article/${articleId}?lang=mm`}>Myanmar</Link>
      <Link href={`/article/${articleId}?lang=fr`}>France</Link>
    </div>
  );
};

export default ArticleDetail;
