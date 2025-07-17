import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import BlogDetailCard from "./BlogDetailCard";
import Container from "@/components/layout/components/Container";
import { useLoaderData } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postDetailQuery, postsQuery } from "@/api/query";

const BlogDetail = () => {
  // const { blogId } = useParams();
  // const currentId = posts.find((post) => post.id === blogId);
  // console.log(currentId);

  const { postId } = useLoaderData();
  console.log(postId, "postId");

  const { data: postDetailData } = useSuspenseQuery(postDetailQuery(postId));
  const { data: postsData } = useSuspenseQuery(postsQuery("limit=6"));

  console.log(postDetailData, postsData);

  return;
  return (
    <div className="container mx-auto my-20">
      <Container>
        <BreadCrumb
          currentPage="BlogDetail"
          links={[{ path: "/blogs", title: "Blogs" }]}
        />
        <BlogDetailCard currentId={postDetailData} posts={postsData} />
      </Container>
    </div>
  );
};

export default BlogDetail;
