import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  downloadURL: any;
  formUpload = new FormGroup({
    caption: new FormControl(''),
    file: new FormControl('', [Validators.required])
  });
  photo: any;
  posts: Array<Post>;
  ref: AngularFireStorageReference;
  subscription: Subscription;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  user: User;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
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
    this.postService.getPosts()
    .subscribe((posts: Array<Post>) => {
      console.log(posts)
      this.posts = posts;
    });
  }
}
