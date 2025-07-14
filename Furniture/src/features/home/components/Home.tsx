import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";
import BlogCardSection from "./BlogCardSection";
import ProductCardSection from "./ProductCardSection";
import Container from "@/components/layout/components/Container";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postsQuery, productsQuery } from "@/api/query";

// this is method 1
// import { useLoaderData } from "react-router";

// this is method 2
// import { useQuery } from "@tanstack/react-query";
// import { postsQuery, productsQuery } from "@/api/query";
// import { Button } from "@/components/ui/button";
const Home = () => {
  // this is method 1
  // const { productsData, postsData } = useLoaderData();

  // this is method 2
  // const {
  //   data: productsData,
  //   isLoading: isProductsLoading,
  //   isError: isProductsError,
  //   error: productsError,
  //   refetch: refetchProducts,
  // } = useQuery(productsQuery("limit=8"));

  // const {
  //   data: postsData,
  //   isLoading: isPostsLoading,
  //   isError: isPostsError,
  //   error: postsError,
  //   refetch: refetchPosts,
  // } = useQuery(postsQuery("limit=3"));

  // if (isProductsLoading && isPostsLoading) {
  //   return (
  //     <div>
  //       <h1 className="flex h-svh items-center justify-center text-center">
  //         Loading...
  //       </h1>
  //     </div>
  //   );
  // }

  // if (isProductsError && isPostsError) {
  //   return (
  //     <div className="flex h-svh flex-col items-center justify-center text-center">
  //       <h1 className="mb-2 font-semibold text-red-400">
  //         {productsError?.message || postsError?.message}
  //       </h1>
  //       <Button
  //         onClick={() => {
  //           refetchProducts();
  //           refetchPosts();
  //         }}
  //         variant="secondary"
  //       >
  //         Retry
  //       </Button>
  //     </div>
  //   );
  // }

  // this is method 3
  const { data: productsData } = useSuspenseQuery(productsQuery("limit=8"));
  const { data: postsData } = useSuspenseQuery(postsQuery("limit=3"));
  // console.log(postsData, "postsData");

  return (
    <section className="container mx-auto my-20 2xl:my-16">
      <Container>
        <HeroSection />
        <ProductCarouselSection products={productsData.products} />
        <ProductCardSection products={productsData.products} />
        <BlogCardSection posts={postsData.posts} />
      </Container>
    </section>
  );
};

export default Home;
