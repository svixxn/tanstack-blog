import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { fetchPost } from "~/utils/posts";

export const Route = createFileRoute("/index/$id")({
  loader: async ({ params }) => {
    const { id } = params;
    if (!id) {
      throw new Error("ID is required");
    }

    const data = await fetchPost({
      data: { id: Number(id) },
    });

    if (!data) {
      throw new Error("Post not found");
    }
    return data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all posts
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.name}
            </h1>

            <div className="flex items-center text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
