import { QueryClient } from "@tanstack/react-query";
import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 2,
    },
  },
});

const fetchProducts = async (q: string) =>
  await api.get(`dashboard/products?${q ?? ""}`).then((res) => res.data);

export const productsQuery = (q: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProducts(q),
});

const fetchPosts = async (q: string) =>
  await api.get(`dashboard/posts/infinite?${q ?? ""}`).then((res) => res.data);

export const postsQuery = (q: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});

// useQuery for get data(read)
// useMutation for post, put,delete data(write)
