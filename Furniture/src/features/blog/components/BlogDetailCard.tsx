import { Button } from "@/components/ui/button";
import { Post } from "@/types";
import SanitizedComponent from "./SanitizedComponent";
import { NavLink } from "react-router";
import { Icons } from "@/components/Icons";

interface DetailPostProps {
  currentId: Post | undefined;
  posts: Post[];
}

const BlogDetailCard = ({ currentId, posts }: DetailPostProps) => {
  return (
    <div className="flex flex-col justify-between gap-16 lg:flex-row">
      {/* Left Content */}
      <div className="w-full space-y-5 lg:w-2/3 2xl:w-3/4">
        <h1 className="line-clamp-1 text-xl font-extrabold lg:text-3xl 2xl:text-4xl">
          {currentId?.title}
        </h1>
        <div className="text-sm">
          by <span className="font-semibold">{currentId?.author}</span> on
          <span className="font-semibold"> {currentId?.updated_at}</span>
        </div>
        <p className="line-clamp-3 text-base font-medium 2xl:line-clamp-2">
          {currentId?.content}
        </p>
        <img
          src={currentId?.image}
          alt="Blog Image"
          className="w-full rounded-2xl"
        />

        {currentId && <SanitizedComponent htmlContent={currentId?.body} />}

        <div className="flex items-center gap-4">
          {currentId?.tags.map((tag) => (
            <Button key={tag}>{tag}</Button>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Sticky */}
      <div className="w-full lg:w-1/3 2xl:w-1/4">
        <div className="sticky top-20">
          <div className="mb-5 flex items-center gap-1">
            <Icons.SquareBlog className="size-5" />
            <h1 className="text-base font-semibold">Other Blog Posts</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {posts.map((post) => (
              <NavLink
                key={post.id}
                to={`/blogs/${post.id}`}
                className={({ isActive }) =>
                  `block p-2 mb-3 rounded-md transition-all ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`
                }
              >
                <div className=" flex gap-3">
                  <img
                    src={post.image}
                    alt="Blog Image"
                    className="w-24 rounded-md"
                  />
                  <div>
                    <h1 className="line-clamp-2 text-sm">{post.content}</h1>
                    <i>... see more</i>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailCard;
