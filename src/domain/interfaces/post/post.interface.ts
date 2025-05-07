import { UserView } from "../user/user.interface"

export interface PostView {
  ulid: string
  title: string
  content: string
  published: boolean
  likes: LikeView[]
  createdAt: string
  categories: CategoryView[]
  updatedAt: string
  author: UserView 
}

export interface CommentView {
  ulid: string
  content: string
  authorId: number
  postId: number
  createdAt: string
  author: UserView 
  post: PostView 
}

export interface CategoryView {
  ulid: string
  name: string
  posts: PostView[] 
}

export interface LikeView {
  ulid: string
  userId: number
  postId: number
  user: UserView 
  post: PostView 
}
