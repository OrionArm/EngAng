import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }

}
