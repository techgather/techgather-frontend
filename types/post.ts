export interface Post {
  postId: number;
  title: string;
  pubDate: string;
  thumbnail: string;
  url: string;
  tags: string[];
}

export interface DashboardResponse {
  posts: Post[];
  hasNext: boolean;
  nextPostId: number;
}
