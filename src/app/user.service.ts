import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user;
  private admin = false;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    this.auth.authState.subscribe(change => {
      this.user = change;

      if(change) {
        this.firestore.collection("users").doc(change.uid).get().subscribe(response => {
          this.admin = response.get("admin");
        });
      }
      console.log(change);
    });
  }

  public getAutenticatedUser() {
    return this.user;
  }

  public userListener() {
    return this.auth.authState;
  }
}
