import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserModel} from '../_models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  getUsers() {
    // get users from secure api end point
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }
}
