import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/login",
        search: { redirectTo: "/home" },
      });
    } else {
      throw redirect({
        to: "/home",
      });
    }
  },
});
