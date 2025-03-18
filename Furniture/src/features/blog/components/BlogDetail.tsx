import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import { useParams } from "react-router";
import { posts } from "@/data/posts";
import BlogDetailCard from "./BlogDetailCard";
import Container from "@/components/layout/components/Container";

const BlogDetail = () => {
  const { blogId } = useParams();

  const currentId = posts.find((post) => post.id === blogId);
  // console.log(currentId);

  return (
    <div className="container mx-auto my-20">
      <Container>
        <BreadCrumb
          currentPage="BlogDetail"
          links={[{ path: "/blogs", title: "Blogs" }]}
        />
        <BlogDetailCard currentId={currentId} posts={posts} />
      </Container>
    </div>
  );
};

export default BlogDetail;
