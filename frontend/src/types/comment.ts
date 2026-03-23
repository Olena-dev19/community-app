export interface Comment {
  _id: string;
  postId: string;
  text: string;
  createdAt: string;
  parrentComponentId?: string; // For nested comments
  replies?: Comment[];
  userName: string;
}
