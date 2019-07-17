import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public router: Router,
    public fireauth: AngularFireAuth,
    public userService: UserService
  ) {}

  user;

  ngOnInit() {
    this.userService.userListener().subscribe(change => {
      this.user = change;
    });
  }

  public isActiveUrl(url) {
    if(url == '/') {
      return this.router.url == '/';
    }
    return this.router.url.indexOf(url) > -1;
  }

  public login() {
    this.fireauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout() {
    this.fireauth.auth.signOut();
  }
}
