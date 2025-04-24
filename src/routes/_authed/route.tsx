import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { LeftSidebar } from "./-components/LeftSideBar";
import { RightSidebar } from "./-components/RightSideBar";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="bg-background">
      <div className="flex justify-center">
        <div className="flex max-w-7xl w-full">
          <aside className="hidden sm:block shrink-0">
            <LeftSidebar />
          </aside>

          <Outlet />

          <aside className="hidden lg:block shrink-0">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
