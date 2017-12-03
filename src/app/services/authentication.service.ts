import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {UserCache, UserModel} from '../_models/user';
import {Config} from '../_models/config';

@Injectable()
export class AuthenticationService {
  // public token: string = null;
  public token: any;
  private userCache: UserCache;
  private sigIpUrl = environment.tokenAuth;
  private sigUpUrl = environment.registrationUrl;
  private storageName: string = `${this.config.appName}:account`;

  constructor(private http: HttpClient,
              private config: Config) {
    const currentUser = JSON.parse(localStorage.getItem(this.storageName));
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

  public getToken(): string {
    return this.userCache && this.userCache.token;
  }

  public getCurrentUser(): UserModel {
    return this.userCache && this.userCache.user;
  }
}
