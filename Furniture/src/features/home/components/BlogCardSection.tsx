import { Post } from "@/types";
import Title from "./Title";
import { Link } from "react-router";

interface BlogCardSectionProps {
  posts: Post[];
}

const BlogCardSection = ({ posts }: BlogCardSectionProps) => {
  return (
    <section className="mt-24">
      <Title title="Recent Blog" href={`/blogs`} linkTitle="View All Posts" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/blogs/${post.id}`} className="">
            <img src={post.image} alt="Blog Image" className="w-full rounded-md" />
            <h1 className="text-base font-semibold line-clamp-1 my-2">{post.title}</h1>
            <span className="text-sm">
              by<span className="font-semibold"> {post.author} </span>on
              <span className="font-semibold"> {post.updated_at}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogCardSection;
