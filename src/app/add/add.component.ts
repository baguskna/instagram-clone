import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { User } from '../interface/User';
import { Post } from '../interface/Post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() user: User;
  @Output() close = new EventEmitter<void>();
  downloadURL: any;
  formUpload = new FormGroup({
    caption: new FormControl(''),
    file: new FormControl('', [Validators.required])
  });
  photo: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  subscription: Subscription;
  uploadProgress: Observable<number>;

  constructor(
    private postService: PostService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmitForm(event): void {
    event.preventDefault();
    if (!this.user) {
      return;
    }

    if (!this.photo) {
      alert('Please Insert Photo');
    } else {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.storage.ref('/images/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(this.photo);
    // observe upload progress
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe((url: string) => {
          const data: Post = {
            caption: this.formUpload.get('caption').value,
            imageUrl: url,
            timestamp: new Date().getTime(),
            owner: this.user.displayName,
            ownerPhotoUrl: this.user.photoURL,
            uid: this.user.uid,
            // initial post has 0 likes
            likes: 0,
          }
          this.postService.addPost(data);
          this.uploadProgress = new Observable<number>();
          this.formUpload.reset();
          this.photo = '';
          this.close.emit();
        });
      })
    )
    .subscribe();
  }

  upload(event): void {
    if (event.target.files[0]) {
      this.photo = event.target.files[0];
    }
  }
}
