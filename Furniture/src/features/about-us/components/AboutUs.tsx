import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";

const AboutUs = () => {
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="AboutUs" />
        <h1 className="text-xl font-bold 2xl:text-2xl">About Us</h1>
      </Container>
    </section>
  );
};

export default AboutUs;
