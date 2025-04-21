import React from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const trendingTopics = [
  {
    id: "1",
    hashtag: "TechConference2025",
    category: "Technology",
    postCount: "24.5K posts",
  },
  {
    id: "2",
    hashtag: "SummerOlympics",
    category: "Sports",
    postCount: "125K posts",
  },
  {
    id: "3",
    hashtag: "ArtificialIntelligence",
    category: "Technology",
    postCount: "87.3K posts",
  },
  {
    id: "4",
    hashtag: "ClimateAction",
    category: "Environment",
    postCount: "45.8K posts",
  },
  {
    id: "5",
    hashtag: "MentalHealthAwareness",
    category: "Health",
    postCount: "32.1K posts",
  },
  {
    id: "6",
    hashtag: "SpaceExploration",
    category: "Science",
    postCount: "18.9K posts",
  },
];

export const suggestedUsers = [
  {
    id: "1",
    name: "Emma Roberts",
    username: "emma_creative",
    profileImage:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true,
    reason: "Followed by mikejohn and others",
  },
  {
    id: "2",
    name: "Global News",
    username: "global_news",
    profileImage:
      "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=150",
    verified: true,
    reason: "Trending in your area",
  },
  {
    id: "3",
    name: "Alex Garcia",
    username: "alex_tech",
    profileImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    reason: "Similar to accounts you follow",
  },
];

export function RightSidebar() {
  return (
    <div className="sticky top-[3.5rem] h-[calc(100vh-3.5rem)] w-full max-w-xs py-4 px-4 hidden lg:flex flex-col space-y-4 overflow-y-auto custom-scrollbar">
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="rounded-full bg-muted/50 border-none pl-10 focus-visible:ring-primary"
          placeholder="Search"
          type="search"
        />
      </div>

      <Card className="border-none shadow-none bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Trends for you</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="space-y-4">
            {trendingTopics.map((trend) => (
              <div
                key={trend.id}
                className="flex justify-between group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-1.5 rounded-md transition-colors"
              >
                <div>
                  <p className="text-xs text-muted-foreground">
                    {trend.category}
                  </p>
                  <p className="font-medium">#{trend.hashtag}</p>
                  <p className="text-xs text-muted-foreground">
                    {trend.postCount}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="text-primary text-sm mt-2 w-full justify-start hover:bg-primary/10 px-2"
          >
            Show more
          </Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="space-y-4">
            {suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between group hover:bg-muted/50 -mx-2 px-2 py-2 rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-medium line-clamp-1 mr-1">
                        {user.name}
                      </span>
                      {user.verified && (
                        <span className="inline-flex items-center justify-center bg-primary rounded-full h-4 w-4">
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
                    </div>
                    <span className="text-sm text-muted-foreground">
                      @{user.username}
                    </span>
                    {user.reason && (
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {user.reason}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="text-primary text-sm mt-2 w-full justify-start hover:bg-primary/10 px-2"
          >
            Show more
          </Button>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground px-4 mt-2">
        <div className="flex flex-wrap gap-x-2">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
          <a href="#" className="hover:underline">
            Ads info
          </a>
          <a href="#" className="hover:underline">
            More...
          </a>
        </div>
        <p className="mt-2">© 2025 TwitterX Corp.</p>
      </div>
    </div>
  );
}
