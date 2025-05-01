import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost, deletePost, fetchPosts } from "./service";
import type { Post } from "./types";
import type { BaseResponse } from "~/types";
import { useRouteContext } from "@tanstack/react-router";

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const user = useRouteContext({
    strict: false,
    select: (context) => context.user,
  });

  return useMutation({
    mutationKey: ["posts", "create"],
    mutationFn: (data: { content: string }) => createPost({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      queryClient.setQueryData(["posts"], (old: BaseResponse<Post[]>) => ({
        ...old,
        data: [
          {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            content: data.content,
            image: null,
            user_id: user?.id,
            likes: 0,
            reposts: 0,
            users: {
              id: user?.id,
              user_name: user?.username,
              last_name: user?.lastName,
              first_name: user?.firstName,
            },
          },
          ...old.data,
        ],
      }));

      return { previousPosts };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["posts", "delete"],
    mutationFn: (data: { id: string }) => deletePost({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      queryClient.setQueryData(["posts"], (old: BaseResponse<Post[]>) => ({
        ...old,
        data: old.data.filter((post) => post.id !== data.id),
      }));
      return { previousPosts };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
