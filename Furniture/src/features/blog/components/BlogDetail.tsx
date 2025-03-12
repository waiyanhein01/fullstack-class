import { useParams } from "react-router";

const BlogDetail = () => {
  const { blogId } = useParams();
  return <div>BlogDetail: {blogId}</div>;
};

export default BlogDetail;
