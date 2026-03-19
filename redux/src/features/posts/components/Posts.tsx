import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  createNewPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "@/store/postsSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";

function Posts() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.posts);

  const [newPosts, setNewPosts] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      await dispatch(createNewPost({ title: newPosts })).unwrap();
      setNewPosts("");
    } catch (error) {
      alert("Failed to create new post: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit
  const handleEditPosts = async (id: string) => {
    if (!editTitle.trim()) return;
    try {
      await dispatch(updatePost({ id, title: editTitle })).unwrap();
      setEditId(null);
      setEditTitle("");
    } catch (error) {
      alert("Failed to update post: " + error);
    }
  };

  // Delete
  const handleDeletePosts = async (id: string) => {
    try {
      await dispatch(deletePost(id)).unwrap();
    } catch (error) {
      alert("Failed to delete post: " + error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
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
          {items.map((post) => (
            <Card key={post.id} className="mx-auto w-full max-w-sm mb-4">
              <CardHeader>
                <CardTitle>
                  {editId === post.id ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    post.title
                  )}
                </CardTitle>
              </CardHeader>

              <CardFooter className="flex gap-2 w-full">
                {editId === post.id ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleEditPosts(post.id)}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditId(post.id);
                        setEditTitle(post.title);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeletePosts(post.id)}
                      className="bg-red-500 hover:bg-red-600"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default Posts;
