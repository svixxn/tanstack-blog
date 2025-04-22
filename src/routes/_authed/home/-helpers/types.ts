export type Post = {
  id: string;
  created_at: string;
  content: string;
  likes: number;
  comments?: number;
  reposts: number;
  users: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
  };
};
