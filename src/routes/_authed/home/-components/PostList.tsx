import { PostCard } from "./PostCard";
import type { Post } from "~/domains/posts/types";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <div className="divide-y divide-border">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
