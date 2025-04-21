import { createFileRoute, redirect } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreatePostForm } from "./-components/CreatePostForm";
import { PostList } from "./-components/PostList";

export const Route = createFileRoute("/_authed/home/")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen flex-1 border-x w-full">
      <div className="sticky top-14 z-10 bg-background/60 backdrop-blur-md border-b">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold">Home</h2>
        </div>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-transparent h-12">
            <TabsTrigger
              value="for-you"
              className="data-[state=active]:bg-transparent transition-all border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-full"
            >
              For you
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="data-[state=active]:bg-transparent transition-all border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-full"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you" className="mt-0">
            <CreatePostForm />
            <PostList />
          </TabsContent>
          <TabsContent value="following" className="mt-0">
            <CreatePostForm />
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <h3 className="text-xl font-bold mb-2">No posts yet</h3>
              <p className="text-muted-foreground max-w-md">
                When you follow people, you'll see their posts here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
