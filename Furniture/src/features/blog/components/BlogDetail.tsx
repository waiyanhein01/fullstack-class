import { useParams } from "react-router";

const BlogDetail = () => {
  const { blogId } = useParams();
  return <div className="container mx-auto my-20">BlogDetail: {blogId}</div>;
};

export default BlogDetail;
