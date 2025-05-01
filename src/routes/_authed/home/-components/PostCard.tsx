import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import type { Post } from "~/domains/posts/types";
import PostDropdownMenu from "./PostDropdownMenu";
import { useMatches } from "@tanstack/react-router";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const matches = useMatches();
  const user = matches.find((match) => match.context?.user)?.context?.user;

  return (
    <div className="border-b px-4 py-3 hover:bg-muted/10 post-card transition-colors">
      <div className="flex">
        <div className="mr-3 pt-0.5">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt={post.users.first_name}
            />
            <AvatarFallback>
              {post.users.first_name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div className="flex items-center max-w-[80%]">
              <span className="font-bold hover:underline cursor-pointer truncate">
                {post.users.first_name} {post.users.last_name}
              </span>
              {true && (
                <span className="inline-flex items-center justify-center bg-primary rounded-full h-4 w-4 ml-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Verified"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              <span className="text-muted-foreground ml-1 truncate">
                @{post.users.username}
              </span>
              <span className="text-muted-foreground mx-1">·</span>
              <span className="text-muted-foreground truncate hover:underline cursor-pointer">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="ml-auto">
              <PostDropdownMenu
                postId={post.id}
                isOwned={post.users.id === user?.id}
              />
            </div>
          </div>

          <div className="mt-1 text-[15px] whitespace-pre-wrap break-all">
            {post.content}
          </div>

          {/* {post.images && post.images.length > 0 && (
            <div className="mt-3 rounded-xl overflow-hidden max-w-full">
              <img
                src={post.images[0]}
                alt="Post attachment"
                className="object-cover w-full max-h-96 bg-muted"
              />
            </div>
          )} */}

          <div className="flex justify-between mt-3 max-w-md text-muted-foreground">
            <button
              type="button"
              className="flex items-center group"
              aria-label="Reply"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-sm ml-1 group-hover:text-blue-500">
                {post.comments || 0}
              </span>
            </button>

            <button
              type="button"
              className="flex items-center group"
              // onClick={toggleRepost}
              aria-label="Repost"
            >
              <div
                className={cn(
                  "p-2 rounded-full group-hover:bg-green-50 group-hover:text-green-500 transition-colors",
                  false && "text-green-500",
                )}
              >
                <Repeat2 className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "text-sm ml-1 group-hover:text-green-500",
                  false && "text-green-500",
                )}
              >
                {post.reposts}
              </span>
            </button>

            <button
              type="button"
              className={cn(
                "flex items-center group",
                false && "text-pink-500",
              )}
              // onClick={toggleLike}
              aria-label="Like"
            >
              <div
                className={cn(
                  "p-2 rounded-full group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors",
                  false && "text-pink-500",
                  false && "animate-heartbeat",
                )}
              >
                <Heart className={cn("h-5 w-5", false && "fill-current")} />
              </div>
              <span
                className={cn(
                  "text-sm ml-1 group-hover:text-pink-500",
                  false && "text-pink-500",
                )}
              >
                {post.likes}
              </span>
            </button>

            <button
              type="button"
              className="flex items-center group"
              aria-label="Share"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <Share className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
