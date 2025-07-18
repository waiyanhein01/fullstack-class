import Container from "@/components/layout/components/Container";
import BlogCard from "./BlogCard";
import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postsInfiniteQuery } from "@/api/query";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    // isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    // hasPreviousPage,
    error,
  } = useInfiniteQuery(postsInfiniteQuery());

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return status === "pending" ? (
    <p>Loading..</p>
  ) : status === "error" ? (
    <p>Blog Error:{error.message}</p>
  ) : (
    <section className="container mx-auto mt-20">
      <Container>
        <BreadCrumb currentPage="Blogs" />
        <h1 className="text-xl font-bold 2xl:text-2xl">Latest Blog Posts</h1>
        <BlogCard posts={allPosts} />
      </Container>
      <div className="my-4 flex justify-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant={!hasNextPage ? "ghost" : "outline"}
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
              ? "See More"
              : "Nothing more to show"}
        </Button>
      </div>
      <div className="">
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </section>
  );
};

export default Blog;
