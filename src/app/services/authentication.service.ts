import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  // public token: string = null;
  public token: any;
  private sigIpUrl = environment.tokenAuth;
  private sigUpUrl = environment.registrationUrl;

  constructor(public http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public login(userData): Observable<boolean> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(
      this.sigIpUrl,
      {
        'username': userData.username,
        'password': userData.password
      }, options
    ).map(resp => {
      console.log('AuthenticationService get token: ', resp);
      const token = resp;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({
          username: userData.username, token: token
        }));

        // return true to indicate successful login
        return true;
      }
      return false;
    });
  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  public registration(userData): Observable<boolean> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(
      this.sigUpUrl,
      JSON.stringify({
        'username': userData.username,
        'password': userData.password
      }), options
    ).map(resp => {
      console.log('AuthenticationService get token: ', resp);
      const token = resp;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({
          username: userData.username, token: token
        }));

        // return true to indicate successful login
        return true;
      }
      return false;
    });
  }
}
