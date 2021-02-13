import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Post } from '../interface/Post';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Observable<Array<Post>>;
  subscription: Subscription;
  user: User;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();

    this.subscription = this.authService.user
    .subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPosts(): void {
    this.posts = this.postService.getPosts();
  }
}
