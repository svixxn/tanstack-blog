import {
  Home,
  Search,
  Bell,
  MessageSquare,
  BookmarkIcon,
  User,
  MoreHorizontal,
  PenSquare,
  ListOrdered,
  Users,
} from "lucide-react";
import { Button } from "~/components/ui/button";
export const navLinks = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "explore", label: "Explore", icon: "Search" },
  { id: "notifications", label: "Notifications", icon: "Bell" },
  { id: "messages", label: "Messages", icon: "MessageSquare" },
  { id: "lists", label: "Lists", icon: "ListOrdered" },
  { id: "bookmarks", label: "Bookmarks", icon: "Bookmark" },
  { id: "communities", label: "Communities", icon: "Users" },
  { id: "profile", label: "Profile", icon: "User" },
  { id: "more", label: "More", icon: "MoreHorizontal" },
];

export const currentUser = {
  id: "current",
  name: "John Smith",
  username: "johnsmith",
  profileImage:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  verified: false,
};
export function LeftSidebar() {
  return (
    <div className="sticky top-0 flex flex-col py-2 w-full max-w-[88px] md:max-w-[240px]">
      <div className="flex flex-col flex-1 px-4">
        <nav className="flex flex-col space-y-1 mt-2">
          {navLinks.map((link) => {
            const Icon = getIconComponent(link.icon);
            return (
              <Button
                key={link.id}
                variant={link.id === "home" ? "secondary" : "ghost"}
                className="justify-start h-12 px-3"
                asChild
              >
                <a href="#" className="group">
                  <Icon className="h-5 w-5 mr-0 md:mr-4" />
                  <span className="hidden md:inline-flex">{link.label}</span>
                </a>
              </Button>
            );
          })}
        </nav>

        <Button className="mt-4 rounded-full bg-primary hover:bg-primary/90 text-white h-12 px-4 md:px-6">
          <PenSquare className="h-5 w-5 md:mr-2 md:hidden" />
          <span className="hidden md:inline-flex">Post</span>
        </Button>
      </div>
    </div>
  );
}

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "Home":
      return Home;
    case "Search":
      return Search;
    case "Bell":
      return Bell;
    case "MessageSquare":
      return MessageSquare;
    case "Bookmark":
      return BookmarkIcon;
    case "User":
      return User;
    case "MoreHorizontal":
      return MoreHorizontal;
    case "ListOrdered":
      return ListOrdered;
    case "Users":
      return Users;
    default:
      return Home;
  }
}
