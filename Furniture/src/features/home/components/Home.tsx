import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";
import BlogCardSection from "./BlogCardSection";
import Container from "@/components/layout/components/Container";
import ProductCardSection from "./ProductCardSection";

// import { useLoaderData } from "react-router"; this is method 1
import { useQuery } from "@tanstack/react-query";
import { postsQuery, productsQuery } from "@/api/query";
const Home = () => {
  // const { productsData, postsData } = useLoaderData(); this is method 1
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery(productsQuery("limit=8"));

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    refetch: refetchPosts,
  } = useQuery(postsQuery("limit=3"));

  if (isProductsLoading && isPostsLoading) {
    return <div>Loading...</div>;
  }

  if (isProductsError && isPostsError) {
    return <div>Error: {productsError?.message || postsError?.message}</div>;
  }
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
