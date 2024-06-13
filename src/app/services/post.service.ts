import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostsResponse, CreatePostRequest, Post} from "./models";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getPosts(page: number) {
    return this.http.get<PostsResponse>(`${this.apiBaseUrl}/api/posts?page=${page}`);
  }

  createPost(createPostRequest: CreatePostRequest) {
    return this.http.post<Post>(`${this.apiBaseUrl + '/api/posts'}`, createPostRequest)
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.apiBaseUrl + '/api/posts/'+ postId}`)
  }

}
