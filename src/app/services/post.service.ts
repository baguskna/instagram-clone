import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { AngularFireStorage } from '@angular/fire/storage';

import { Post } from '../interface/Post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getPosts(): Observable<Array<Post>> {
    return this.db.collection('posts', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addPost(data: Post): void {
    this.db.collection('posts').add(data);
  }

  deletePost(id: string, url: string): void {
    // delete data in database
    this.db
    .collection('posts')
    .doc(id)
    .delete()
    .then(() => {
      // delete image in firebase storage
      this.storage
      .storage
      .refFromURL(url)
      .delete();
    })
    .catch(err => {
      alert(err);
    });
  }

  likePost(post: Post, userId: string): void {
    this.db
    .collection('posts')
    .doc(post.id)
    .set({ likes: post.likes }, { merge: true })
    .then(() => {
      this.userPostLikes(post, userId);
    });
  }

  private userPostLikes(post: Post, userId: string): void {
    this.db.collection('user')
    .doc(userId)
    .collection('like_posts')
    .add(post);
  }

  getLikesPost(userId: string) {
    return this.db.collection('user')
    .doc(userId)
    .collection('like_posts')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
}
