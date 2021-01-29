import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../interface/Post';
import { User } from '../interface/User';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() user: User;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  delete(id: string, uid: string): void {
    if (uid === this.user.uid) {
      this.postService.deletePost(id);
    } else {
      throw new Error('You are not the owner');
    }
  }
}
