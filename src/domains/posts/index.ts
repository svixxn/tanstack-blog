import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost, deletePost, fetchPosts } from "./service";

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data: { content: string }) => createPost({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (data: { id: string }) => deletePost({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
