import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "./supabase";

export type PostType = {
  id: string;
  created_at: string;
  name: string;
  description: string;
};

export const fetchPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data: posts } = await supabase.from("posts").select();

    console.log(posts);

    return posts as PostType[];
  }
);

export const fetchPost = createServerFn({ method: "GET" })
  .validator((data: { id: number }) => data)
  .handler(async (ctx) => {
    const supabase = getSupabaseServerClient();
    const { data: post } = await supabase
      .from("posts")
      .select("*")
      .eq("id", ctx.data.id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post[0] as PostType;
  });
