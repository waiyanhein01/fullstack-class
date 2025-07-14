import { Post } from "@/types";
import { Link } from "react-router";

interface BlogCardProps {
  posts: Post[];
}
const BlogCard = ({ posts }: BlogCardProps) => {
  const imgUrl = import.meta.env.VITE_IMG_URL;
  return (
    <div className="mt-6 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} to={`/blogs/${post.id}`} className="">
          <img
            src={imgUrl + post.image}
            alt="Blog Image"
            className="w-full rounded-2xl"
          />
          <h1 className="my-2 line-clamp-1 text-xl font-extrabold">
            {post.title}
          </h1>
          <h1 className="text-muted-foreground my-2 line-clamp-3 text-base font-medium 2xl:line-clamp-2">
            {post.content}
          </h1>
          <span className="text-sm">
            by<span className="font-semibold"> {post.author.fullName} </span>on
            <span className="font-semibold"> {post.updatedAt}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BlogCard;
