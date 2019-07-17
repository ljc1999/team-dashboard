import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(change => {
      this.user = change;
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
