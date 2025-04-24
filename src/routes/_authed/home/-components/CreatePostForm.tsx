import React, { useState } from "react";
import { Image, MapPin, Calendar, Smile, AlignLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { getSupabaseClient } from "~/lib/supabase";
import { useCreatePost } from "../-helpers";
import { toast } from "sonner";

export const currentUser = {
  id: "current",
  name: "John Smith",
  username: "johnsmith",
  profileImage:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  verified: false,
};

export function CreatePostForm() {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { mutateAsync: createPost } = useCreatePost();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const res = await createPost({
        content: content.trim(),
      });

      if (res?.error) {
        toast("Error", {
          description: res.message,
        });
        return;
      }

      setContent("");
    }
  };

  const remainingChars = 280 - content.length;
  const isValid = content.trim().length > 0 && remainingChars >= 0;

  return (
    <div className="border-b p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="mr-3 pt-1">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={currentUser.profileImage}
                alt={currentUser.name}
              />
              <AvatarFallback>
                {currentUser.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            {!isFocused && content.length === 0 && (
              <div className="absolute mt-3 ml-1 text-muted-foreground pointer-events-none">
                What's happening?
              </div>
            )}
            <Textarea
              value={content}
              onChange={handleContentChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="min-h-[80px] border-none resize-none focus-visible:ring-0 p-0 pt-2 placeholder-muted-foreground text-lg break-all"
              placeholder=""
            />

            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <Image className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <AlignLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <Calendar className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                {content.length > 0 && (
                  <div
                    className={`text-xs font-medium ${remainingChars < 20 ? "text-orange-500" : remainingChars < 0 ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    {remainingChars}
                  </div>
                )}
                <Button
                  type="submit"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white px-4 py-2"
                  disabled={!isValid}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
