
export interface PostAuthor {
  id: number
  name: string
}

export interface Post {
  id: number
  title: string
  content: string
  createdBy: PostAuthor
  createdAt: Date
}

export interface PostView {
  id: number
  title: string
  url: string | null
  content: string
  createdBy: PostAuthor
  createdAt: Date
  editable: boolean
}

export interface PostsResponse {
  data: PostView[],
  totalElements: number
  pageNumber: number
  totalPages: number
  isFirst: boolean
  isLast: boolean
  hasNext: boolean
  hasPrevious: boolean
}

export interface CreatePostRequest {
  title: string
  url: string | null
  content: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  expires_at: string
  user: LoginUser
}

export interface LoginUser {
  email: string
  name: string
  role: string
}

export interface CreateUserRequest {
  email: string
  password: string
  name: string
}

export interface CreateUserResponse {
  email: string
  name: string
  role: string
}
