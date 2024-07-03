import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PostsResponse} from "../../services/models";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {PaginationComponent} from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './posts.component.html',
  imports: [
    CommonModule,
    NgForOf,
    RouterLink,
    PaginationComponent,
    NgIf
  ],
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  page = 1
  postsResponse: PostsResponse = {
      data: [],
      totalElements: 0,
      pageNumber: 0,
      totalPages: 0,
      isFirst: false,
      isLast: false,
      hasNext: false,
      hasPrevious: false
    }

  constructor(private route: ActivatedRoute, private postService: PostService,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.page = parseInt(params.get('page') || "1");
      this.fetchPosts();
    })
  }

  fetchPosts() {
    this.postService.getPosts(this.page).subscribe(response => {
      let posts = response.data;
      const loginUser = this.authService.getLoginUser()
      if (loginUser) {
        let loginUserId = loginUser.user.id, loginUserRole = loginUser.user.role;
        posts.forEach(p => {
          if (p.createdBy.id === loginUserId || loginUserRole === "ROLE_ADMIN") {
            p.editable = true
          }
        })
      }
      this.postsResponse = response;
    })
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deletePost(postId: number) {
    return this.postService.deletePost(postId).subscribe(response => {
      this.fetchPosts();
    });
  }
}
