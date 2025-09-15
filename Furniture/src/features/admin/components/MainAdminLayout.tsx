import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./SiteHeader";
// import { SectionCards } from "./SectionCards";
// import { ChartAreaInteractive } from "./ChartAreaInteractive";
import { AdminSidebar } from "./AdminSideBar";
import { Outlet } from "react-router";

export default function MainAdminLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
