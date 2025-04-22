import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "~/lib/supabase";
import { Post } from "./types";
import { createPostSchema } from "./schemas";

export const fetchPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
          *,
            users (
            id,
            first_name,
            last_name,
            username
            )
        `
      )
      .order("created_at", { ascending: false });

    console.log("data", data);

    return {
      error: error,
      data: data as Post[],
    };
  }
);

export const createPost = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return createPostSchema.parse(data);
  })
  .handler(async ({ data }) => {
    const supabase = await getSupabaseServerClient();

    const { data: auth, error: _error } = await supabase.auth.getUser();

    if (!auth) {
      return {
        error: true,
        message: "User not found",
      };
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", auth.user?.email)
      .single();

    if (userError) {
      return {
        error: true,
        message: userError.message,
      };
    }

    const { error } = await supabase.from("posts").insert({
      content: data.content,
      user_id: user.id,
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });
