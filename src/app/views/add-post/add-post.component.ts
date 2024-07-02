import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { CreatePostRequest} from "../../services/models";
import {PostService} from "../../services/post.service";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-post',
  standalone: true,
  templateUrl: './add-post.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgClass
  ],
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:\/?#[\]@!$&'()*+,;=]+$/;

  addPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.pattern(/\S/)]],
    url: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
    content: [''],
  });

  constructor(private postService: PostService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onAddPostSubmit() {
    if(this.addPostForm.invalid) {
      return;
    }
    const createPostRequest : CreatePostRequest = {
      title: this.addPostForm.value.title || "",
      url: this.addPostForm.value.url || "",
      content: this.addPostForm.value.content || ""
    }
    this.postService.createPost(createPostRequest).subscribe(postResp => {
      this.router.navigate(['/'])
    })
  }
}
