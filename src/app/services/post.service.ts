import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { Post } from '../interface/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFirestore) { }

  getPosts(): Observable<Array<Post>> {
    return this.db.collection('posts', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addPost(data: Post) {
    this.db.collection('posts').add(data);
  }

  deletePost(id: string) {
    this.db
    .collection('posts')
    .doc(id)
    .delete();
  }
}
