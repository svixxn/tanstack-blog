import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }

    throw redirect({
      to: "/auth/login",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
