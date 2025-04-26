import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import Header from "~/components/Header";
import { Toaster } from "~/components/ui/sonner";
import appCss from "~/styles/app.css?url";
import { seo } from "~/lib/seo";
import { fetchUser } from "~/domains/auth/service";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Bloggy",
        description:
          "Bloggy is a social media platform for sharing your thoughts and ideas.",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  beforeLoad: async () => {
    const user = await fetchUser();
    return {
      user,
    };
  },
  loader: async ({ context }) => {
    const user = context.user;
    return {
      user,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <div>OOPS!</div>
      </RootDocument>
    );
  },
  notFoundComponent: () => <div>Not found.</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useLoaderData();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header user={user} />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
