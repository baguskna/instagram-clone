import { Component, OnInit } from '@angular/core';

import { User } from '../interface/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  addData = false;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.authService.user
    .subscribe((user: User) => {
      this.user = user;
    });
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  add(): void {
    if (!this.user) {
      this.authService.login();
    } else {
      this.addData = true;
    }
  }

  onClose() {
    this.addData = false;
  }
}
