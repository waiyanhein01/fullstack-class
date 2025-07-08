import { Post } from "@/types";
import Title from "./Title";
import { Link } from "react-router";

interface BlogCardSectionProps {
  posts: Post[];
}

const imgUrl = import.meta.env.VITE_IMG_URL;

const BlogCardSection = ({ posts }: BlogCardSectionProps) => {
  return (
    <section className="mt-24">
      <Title title="Recent Blog" href={`/blogs`} linkTitle="View All Posts" />
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Link key={post.id} to={`/blogs/${post.id}`} className="">
            <img
              src={imgUrl + post.image}
              alt="Blog Image"
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl"
            />
            <h1 className="my-2 ml-4 line-clamp-1 text-base font-semibold">
              {post.title}
            </h1>
            <span className="ml-4 text-sm">
              by<span className="font-semibold"> {post.author.fullName} </span>
              on
              <span className="font-semibold"> {post.updatedAt}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogCardSection;
