import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  BarChart2,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type User = {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  verified?: boolean;
};

type Post = {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  images?: string[];
  hasLiked?: boolean;
  hasReposted?: boolean;
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [reposted, setReposted] = useState(post.hasReposted || false);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const toggleRepost = () => {
    setReposted(!reposted);
    setRepostCount((prev) => (reposted ? prev - 1 : prev + 1));
  };

  return (
    <div className="border-b px-4 py-3 hover:bg-muted/10 post-card transition-colors">
      <div className="flex">
        <div className="mr-3 pt-0.5">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.profileImage} alt={post.user.name} />
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div className="flex items-center max-w-[80%]">
              <span className="font-bold hover:underline cursor-pointer truncate">
                {post.user.name}
              </span>
              {post.user.verified && (
                <span className="inline-flex items-center justify-center bg-primary rounded-full h-4 w-4 ml-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                @{post.user.username}
              </span>
              <span className="text-muted-foreground mx-1">·</span>
              <span className="text-muted-foreground truncate hover:underline cursor-pointer">
                {post.timestamp}
              </span>
            </div>
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-1 text-[15px] whitespace-pre-wrap">
            {post.content}
          </div>

          {post.images && post.images.length > 0 && (
            <div className="mt-3 rounded-xl overflow-hidden max-w-full">
              <img
                src={post.images[0]}
                alt="Post attachment"
                className="object-cover w-full max-h-96 bg-muted"
              />
            </div>
          )}

          <div className="flex justify-between mt-3 max-w-md text-muted-foreground">
            <button className="flex items-center group" aria-label="Reply">
              <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-sm ml-1 group-hover:text-blue-500">
                {post.comments}
              </span>
            </button>

            <button
              className={cn(
                "flex items-center group",
                reposted && "text-green-500"
              )}
              onClick={toggleRepost}
              aria-label="Repost"
            >
              <div
                className={cn(
                  "p-2 rounded-full group-hover:bg-green-50 group-hover:text-green-500 transition-colors",
                  reposted && "text-green-500"
                )}
              >
                <Repeat2 className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "text-sm ml-1 group-hover:text-green-500",
                  reposted && "text-green-500"
                )}
              >
                {repostCount}
              </span>
            </button>

            <button
              className={cn(
                "flex items-center group",
                liked && "text-pink-500"
              )}
              onClick={toggleLike}
              aria-label="Like"
            >
              <div
                className={cn(
                  "p-2 rounded-full group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors",
                  liked && "text-pink-500",
                  isAnimating && "animate-heartbeat"
                )}
              >
                <Heart className={cn("h-5 w-5", liked && "fill-current")} />
              </div>
              <span
                className={cn(
                  "text-sm ml-1 group-hover:text-pink-500",
                  liked && "text-pink-500"
                )}
              >
                {likeCount}
              </span>
            </button>

            <button
              className="flex items-center group"
              aria-label="View analytics"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span className="text-sm ml-1 group-hover:text-blue-500">
                {post.views}
              </span>
            </button>

            <button className="flex items-center group" aria-label="Share">
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
