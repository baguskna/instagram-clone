import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Subject } from 'rxjs';

import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged(user => {
      this.user.next(user);
    });
   }

   login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   }

   logout(): void {
     this.auth.signOut();
   }
}
