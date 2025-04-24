import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

export const deletePostSchema = z.object({
  id: z.number(),
});
