import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 5 minutes
      // retry: 1,
    },
  },
});

//api call
const fetchProductsForHome = async (q: string) =>
  await api.get(`dashboard/products?${q ?? ""}`).then((res) => res.data);

//cache data in query
export const productsQuery = (q: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProductsForHome(q),
});

const fetchPostsForHome = async (q: string) =>
  await api.get(`dashboard/posts/infinite?${q ?? ""}`).then((res) => res.data);

export const postsQuery = (q: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPostsForHome(q),
});

const fetchInfinitePosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const res = await api.get(`dashboard/posts/infinite${query}`);
  return res.data;
};

export const postsInfiniteQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: fetchInfinitePosts,
  initialPageParam: null, // start with no cursor
  getNextPageParam: (pageParam, pages) => pageParam.nextCursor,
  // getPreviousPageParam: (pageParam, pages) => pageParam.prevCursor,
  // maxPages: 10,
});

const fetchPostDetail = async (id: number) => {
  const post = await api.get(`dashboard/posts/${id}`);
  if (!post) {
    throw new Response("Post not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return post.data;
};

export const postDetailQuery = (id: number) => ({
  queryKey: ["posts", "detail", id],
  queryFn: () => fetchPostDetail(id),
});

const fetchCategoryType = async () =>
  await api.get(`dashboard/category-type`).then((res) => res.data);

export const categoryTypeQuery = () => ({
  queryKey: ["category", "type"],
  queryFn: fetchCategoryType,
});

const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
  types = null,
}: {
  pageParam?: number | null;
  categories?: string | null;
  types?: string | null;
}) => {
  let query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  if (categories) query += `&category=${categories}`;
  if (types) query += `&type=${types}`;
  const res = await api.get(`dashboard/products/${query}`);
  return res.data;
};

export const productsInfiniteQuery = (
  categories: string | null = null,
  types: string | null = null,
) => ({
  queryKey: [
    "products",
    "infinite",
    categories ?? undefined,
    types ?? undefined,
  ],
  queryFn: ({ pageParam }: { pageParam?: number | null }) =>
    fetchInfiniteProducts({ categories, types, pageParam }),
  placeholderData: keepPreviousData,
  initialPageParam: null, // start with no cursor
  getNextPageParam: (pageParam, pages) => pageParam.nextCursor,
  // getPreviousPageParam: (pageParam, pages) => pageParam.prevCursor,
  // maxPages: 10,
});

const fetchProductDetail = async (id: number) => {
  const product = await api.get(`dashboard/products/${id}`);
  if (!product) {
    throw new Response("Product not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return product.data;
};

export const productDetailQuery = (id: number) => ({
  queryKey: ["products", "detail", id],
  queryFn: () => fetchProductDetail(id),
});

// useQuery for get data(read) // useQuery can use in component
// useMutation for post, put,delete data(write)
