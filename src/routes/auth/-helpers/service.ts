import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { getSupabaseServerClient } from "~/lib/supabase";
import { loginSchema, signupSchema } from "./schemas";
import { User } from "./types";

export const loginFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return loginSchema.parse(data);
  })
  .handler(async (ctx) => {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: ctx.data.email,
      password: ctx.data.password,
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    return {
      error: false,
      message: "Login successful",
    };
  });

export const signupFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return signupSchema.parse(data);
  })
  .handler(async ({ data }) => {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    const { error: userError } = await supabase.from("users").insert({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    if (userError) {
      return {
        error: true,
        message: userError.message,
      };
    }

    return {
      error: false,
      message: "Signup successful",
    };
  });

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await getSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (_error || !data.user) {
    return null;
  }

  const user = await supabase
    .from("users")
    .select("*")
    .eq("email", data.user.email)
    .single();

  if (user.error) {
    return null;
  }

  return {
    id: user.data.id,
    email: user.data.email,
    firstName: user.data.first_name,
    lastName: user.data.last_name,
    username: user.data.username,
  } as User;
});

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: "Logout successful",
  };
});
