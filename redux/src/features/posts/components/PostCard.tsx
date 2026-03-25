import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useRedux";
import { deletePost, updatePost } from "@/store/postsSlice";
import { useState } from "react";

interface PostProps {
  id: string;
  title: string;
  userId: string;
}

const PostCard = ({ post }: { post: PostProps }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const dispatch = useAppDispatch();

  // Edit
  const handleEditPosts = async () => {
    if (!editTitle.trim()) return;
    try {
      await dispatch(updatePost({ id: post.id, title: editTitle })).unwrap();
      setEditId(null);
      setEditTitle("");
    } catch (error) {
      alert("Failed to update post: " + error);
    }
  };

  // Delete
  const handleDeletePosts = async () => {
    try {
      await dispatch(deletePost(post.id)).unwrap();
    } catch (error) {
      alert("Failed to delete post: " + error);
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-sm mb-4">
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
              <Button size="sm" onClick={handleEditPosts}>
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
                onClick={handleDeletePosts}
                className="bg-red-500 hover:bg-red-600"
                size="sm"
              >
                Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default PostCard;
