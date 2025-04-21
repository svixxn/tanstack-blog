import React from "react";
import { PostCard } from "./PostCard";

const samplePosts = [
  {
    id: "1",
    content:
      "Just launched our new product! Check it out at our website. #ProductLaunch #TechNews",
    user: {
      id: "1",
      name: "Jessica Chen",
      username: "jess_tech",
      profileImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    timestamp: "2025-04-08T14:48:00.000Z",
    likes: 1248,
    comments: 64,
    reposts: 112,
    views: 25400,
    hasLiked: false,
    hasReposted: false,
  },
  {
    id: "2",
    content:
      "The sunrise from my balcony this morning was absolutely breathtaking. Nature's art at its finest. 🌅",
    user: {
      id: "2",
      name: "Michael Torres",
      username: "mike_travels",
      profileImage:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    timestamp: "2025-04-08T07:22:00.000Z",
    likes: 2471,
    comments: 87,
    reposts: 241,
    views: 42300,
    images: [
      "https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    hasLiked: true,
    hasReposted: false,
  },
  {
    id: "3",
    content:
      'Just finished reading "The Psychology of Money" by Morgan Housel. Highly recommend for anyone interested in personal finance and behavioral economics. What are you reading these days? #BookRecommendations',
    user: {
      id: "3",
      name: "Sophia Williams",
      username: "sophia_reads",
      profileImage:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    timestamp: "2025-04-07T22:15:00.000Z",
    likes: 873,
    comments: 134,
    reposts: 56,
    views: 18900,
    hasLiked: false,
    hasReposted: false,
  },
  {
    id: "4",
    content:
      "Our team just won the championship! So proud of everyone's hard work and dedication this season. 🏆 #Champions #NeverGiveUp",
    user: {
      id: "4",
      name: "David Johnson",
      username: "djohnson",
      profileImage:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    timestamp: "2025-04-07T19:30:00.000Z",
    likes: 3452,
    comments: 287,
    reposts: 532,
    views: 78900,
    images: [
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    hasLiked: false,
    hasReposted: true,
  },
  {
    id: "5",
    content:
      "Working on some exciting new AI features. The potential for this technology continues to amaze me every day. #ArtificialIntelligence #TechInnovation",
    user: {
      id: "5",
      name: "Tech Innovators",
      username: "tech_innov",
      profileImage:
        "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=150",
      verified: true,
    },
    timestamp: "2025-04-07T14:10:00.000Z",
    likes: 1857,
    comments: 132,
    reposts: 421,
    views: 35700,
    hasLiked: true,
    hasReposted: false,
  },
];

export function PostList() {
  return (
    <div className="divide-y divide-border">
      {samplePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
