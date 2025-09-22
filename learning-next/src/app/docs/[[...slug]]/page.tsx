import React from "react";

const DocsDetail = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const { slug } = await params;
  if (slug?.length === 2) {
    return (
      <div>
        DocsDetail of {slug[0]} and {slug[1]}
      </div>
    );
  } else if (slug?.length === 1) {
    return <div>DocsDetail of {slug[0]}</div>;
  }
  return <div>DocsDetail</div>;
};

export default DocsDetail;
