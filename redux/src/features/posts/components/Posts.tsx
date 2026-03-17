import { useAppDispatch } from "@/hooks/useRedux";

function Posts() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="">All Posts</h1>
    </div>
  );
}

export default Posts;
