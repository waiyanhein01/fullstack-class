// import { AdminLoginForm } from "./AdminLooginForm";
import Container from "@/features/layout/components/Container";
import { SectionCards } from "./SectionCards";
import { ChartAreaInteractive } from "./ChartAreaInteractive";

const Admin = () => {
  return (
    <Container>
      <div className="flex flex-col gap-4 md:gap-6">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
    </Container>
  );
};

export default Admin;
