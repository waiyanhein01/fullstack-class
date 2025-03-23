import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";

const Services = () => {
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="Services" />
        <h1 className="text-xl font-bold 2xl:text-2xl">Services</h1>
      </Container>
    </section>
  );
};

export default Services;
