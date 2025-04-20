import { Bell, MessageSquare, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 glass-header`}
    >
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center md:w-72 lg:w-64">
          <h1 className="text-primary font-bold text-2xl hidden md:block">
            Bloggy
          </h1>
        </div>

        <div className="flex-1 mx-4 relative max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="rounded-full bg-secondary/50 border-none pl-10 focus-visible:ring-primary"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>

        {true ? (
          <Link to="/auth/login">
            <Button variant="ghost" className="text-foreground">
              <span className="text-sm font-medium">Sign In</span>
            </Button>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground rounded-full"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground rounded-full"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8 transition-transform hover:ring-2 hover:ring-primary cursor-pointer">
              <AvatarImage
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="John Smith"
              />
              <AvatarFallback>John Smith</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
