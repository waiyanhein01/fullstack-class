import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  createNewPost,
  fetchPosts,
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from "@/store/postsSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import PostCard from "./PostCard";

function Posts() {
  const [newPosts, setNewPosts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  // const { status, error } = useAppSelector((state) => state.posts);
  // const posts = useAppSelector((state) => selectPostsByUserId(state, "user2"));
  const postIds = useAppSelector(selectPostIds);

  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);

  // Fetch
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  // Create
  const handleCreateNewPosts = async () => {
    if (!newPosts.trim()) return;
    setIsLoading(true);
    try {
      await dispatch(
        createNewPost({ title: newPosts, userId: "user2" }),
      ).unwrap();
      setNewPosts("");
    } catch (error) {
      alert("Failed to create new post: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">All Posts</h1>
      <div className="flex gap-2 mb-4 w-full max-w-sm">
        <Input
          value={newPosts}
          onChange={(e) => setNewPosts(e.target.value)}
          placeholder="Add new post"
        />
        <Button
          className={`flex gap-2 disabled:bg-accent-foreground ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
          onClick={handleCreateNewPosts}
        >
          Add {isLoading && <Loader2Icon className="animate-spin" />}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {status === "pending" && (
        <p className="flex items-center gap-2 text-gray-500">
          <Loader2Icon className="animate-spin" />
          Loading...
        </p>
      )}

      {status === "succeeded" && (
        <>
          {postIds.map((postId) => (
            <PostCard key={postId} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
}

export default Posts;
