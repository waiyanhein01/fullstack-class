import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";

const ProductsDetail = () => {
  return (
    <div className="container mx-auto my-20">
      <Container>
        <BreadCrumb
          currentPage="ProductsDetail"
          links={[{ path: "/products", title: "Products" }]}
        />
      </Container>
    </div>
  );
};

export default ProductsDetail;
