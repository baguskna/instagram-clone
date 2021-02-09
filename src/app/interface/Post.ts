import { User } from "./User";

export interface Post {
  id?: string;
  caption: string;
  imageUrl: string;
  timestamp: any;
  owner: string;
  ownerPhotoUrl: string;
  uid: string;
  likes: number;
}
