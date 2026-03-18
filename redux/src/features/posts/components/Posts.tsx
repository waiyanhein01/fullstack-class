import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchPosts } from "@/store/postsSlice";
import { useEffect } from "react";

function Posts() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="mb-4">All Posts</h1>
      {status === "failed" && <p className="text-red-500">{error}</p>}
      {status === "pending" && <p>Loading...</p>}
      {status === "succeeded" && (
        <ul>
          {items.map((post) => (
            <li
              key={post.id}
              className="border border-gray-300 rounded-md p-4 w-full max-w-md mb-3"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>Author: {post.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
