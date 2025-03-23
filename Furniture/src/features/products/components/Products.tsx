import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";

const Products = () => {
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="Products" />
        <h1 className="text-xl font-bold 2xl:text-2xl">Products</h1>
      </Container>
    </section>
  );
};

export default Products;
