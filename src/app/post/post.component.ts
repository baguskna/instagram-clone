import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

import { Post } from '../interface/Post';
import { User } from '../interface/User';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterContentInit {
  @Input() post: Post;
  @Input() user: User;
  deleteModal = false;

  constructor( ) { }

  ngOnInit(): void {
    // this.authService.user
    // .subscribe(
    //   (user: User) => {
    //     this.postService.getLikesPost(user.uid)
    //     .subscribe(
    //     )
    //   }
    // );
  }

  ngAfterContentInit(): void {
  }

  // like(): void {
  //   if (!this.user) {
  //     this.authService.login();
  //   } else {
  //     this.post.likes += 1;
  //     this.postService.likePost(this.post, this.user.uid);
  //   }
  // }

  // get showLike(): string {
  //   return !this.post.likes ? 'like' : 'likes';
  // }

  delete(): void {
    if (this.post.uid === this.user.uid) {
      this.deleteModal = true;
    } else {
      alert('You are not the owner');
    }
  }

  onClose() {
    this.deleteModal = false;
  }
}
