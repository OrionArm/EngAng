import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  // public token: string = null;
  public token: any;
  private url = environment.authApi;

  constructor(public http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post(
      this.url,
      JSON.stringify({
        username: username,
        password: password
      })
    ).map(resp => {
      console.log('AuthenticationService get token: ', resp);
      const token = resp;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({
          username: username, token: token
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
}
