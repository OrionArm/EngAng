import {Injectable} from '@angular/core';
import {UserModel} from '../_models/user';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication.service';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  private url = environment.users;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  getUsers(): Observable<UserModel[]> {
    // add authorization header with jwt token
    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .append(
          'Authorization',
          'Bearer ' + this.authenticationService.token)
    };
    // get users from api
    return this.http.get<UserModel[]>(this.url, options);
  }
}
