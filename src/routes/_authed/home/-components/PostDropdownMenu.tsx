import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useDeletePost } from "~/domains/posts";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type PostDropdownMenuProps = {
  postId: string;
  isOwned: boolean;
};

const PostDropdownMenu = ({ postId, isOwned }: PostDropdownMenuProps) => {
  const { mutateAsync: deletePostAction } = useDeletePost();

  const handleDeletePost = async () => {
    await deletePostAction(
      {
        id: postId,
      },
      {
        onSuccess: () => {
          toast("Success", {
            description: "Post deleted successfully",
          });
        },
        onError: (error) => {
          toast("Error", {
            description: error.message,
          });
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem
          onClick={handleDeletePost}
          disabled={!isOwned}
          className="text-red-500"
        >
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostDropdownMenu;
