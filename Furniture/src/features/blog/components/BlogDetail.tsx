import SanitizedComponent from "./SanitizedComponent";
import { useLoaderData } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postDetailQuery, postsQuery } from "@/api/query";
import { Post, Tag } from "@/types";
import { NavLink } from "react-router";
import { Icons } from "@/components/Icons";
import Container from "@/features/layout/components/Container";
import { BreadCrumb } from "@/features/layout/components/BreadCrumb";

const BlogDetail = () => {
  // const { blogId } = useParams();
  // const currentId = posts.find((post) => post.id === blogId);
  // console.log(currentId);

  const { blogId } = useLoaderData();

  const { data: postDetailData } = useSuspenseQuery(postDetailQuery(+blogId));
  const { data: postsData } = useSuspenseQuery(postsQuery("limit=6"));

  const imgUrl = import.meta.env.VITE_IMG_URL;

  return (
    <div className="container mx-auto my-20">
      <Container>
        <BreadCrumb
          currentPage="BlogDetail"
          links={[{ path: "/blogs", title: "Blogs" }]}
        />
        <div className="flex flex-col justify-between gap-16 lg:flex-row">
          {/* Left Content */}
          <div className="w-full space-y-5 lg:w-2/3 2xl:w-3/4">
            <h1 className="line-clamp-1 text-xl font-extrabold lg:text-3xl 2xl:text-4xl">
              {postDetailData?.post.title}
            </h1>
            <div className="text-sm">
              by{" "}
              <span className="font-semibold">
                {postDetailData?.post.author.fullName}
              </span>{" "}
              on
              <span className="font-semibold">
                {" "}
                {postDetailData?.post.updatedAt}
              </span>
            </div>
            <p className="line-clamp-3 text-base font-medium 2xl:line-clamp-2">
              {postDetailData?.post.content}
            </p>
            <img
              src={imgUrl + postDetailData?.post.image}
              alt="Blog Image"
              className="w-full rounded-2xl"
            />

            {postDetailData?.post && (
              <SanitizedComponent htmlContent={postDetailData?.post.body} />
            )}

            <div className="flex items-center gap-4">
              {postDetailData?.post.tags?.map((tag: Tag) => (
                <button
                  className="rounded bg-[#3b5d50] px-4 py-1 text-slate-100"
                  key={tag.name}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Sticky */}
          <div className="w-full lg:w-1/3 2xl:w-1/4">
            <div className="sticky top-20">
              <div className="mb-5 flex items-center gap-1">
                <Icons.SquareBlogIcon className="size-5" />
                <h1 className="text-base font-semibold">Other Blog Posts</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {postsData.posts.map((post: Post) => (
                  <NavLink
                    key={post.id}
                    to={`/blogs/${post.id}`}
                    className={({ isActive }) =>
                      `mb-3 block rounded-md p-2 transition-all ${
                        isActive ? "bg-gray-200" : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <div className="flex gap-3">
                      <img
                        src={imgUrl + post.image}
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
        {/* <BlogDetailCard currentDetailPost={postDetailData} posts={postData} /> */}
      </Container>
    </div>
  );
};

export default BlogDetail;
