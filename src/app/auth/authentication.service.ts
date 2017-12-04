import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {UserCache, UserModel} from '../_models/user';
import {Config} from '../_models/config';
import {HttpService} from '../services/http.service';

@Injectable()
export class AuthenticationService {
  // public token: string = null;
  public token: any;
  private userCache: UserCache;
  private signInUrl = environment.tokenAuth;
  private signUpUrl = environment.registrationUrl;
  private userserInfoUrl = environment.userInfo;

  private storageName: string = `${this.config.appName}:account`;

  constructor(private http: HttpClient,
              private config: Config,
              private httpService: HttpService) {
    this.loadData();
  }

  public loadData(): UserModel {
    const currentUser = localStorage.getItem(this.storageName);
    this.userCache = currentUser ? JSON.parse(currentUser) : null;
    return this.userCache ? this.userCache.user : null;
  }

  public saveData(data: UserCache): void {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  public isLoggedIn(): boolean {
    return this.userCache && this.userCache.token != null;
  }

  public getToken(): string {
    return this.userCache && this.userCache.token;
  }

  public getCurrentUser(): UserModel {
    return this.userCache && this.userCache.user;
  }

  public login(userData): Observable<boolean> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<{token: string}>(this.signInUrl,
      {
        'email': userData.email,
        'password': userData.password
      }, options)
      .map(response => {
      if (response) {
        this.userCache = new UserCache();
        this.userCache.token = response.token;
        this.getUserInfo(this.userCache.token);
        // TODO: Add userCache.user
        this.saveData(this.userCache);
        // indicate successful login
        return true;
      }
      return false;
    });
  }

  public logout(): void {
    this.userCache = null;
    localStorage.removeItem(this.storageName);
  }

  public registration(userData) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.signUpUrl,
      JSON.stringify({
        'email': userData.email,
        'username': userData.username,
        'address': userData.address,
        'password': userData.password,
        'confirm_password': userData.confirm_password
      }), options
    );

  }

  public getUserInfo(token: string): void {
    const options = this.httpService.getHeaderOptions(token);
    this.http.get(this.userserInfoUrl, options)
      .subscribe(userInfo => console.log(userInfo));
  }

  public updateUserData(userData: UserModel): void {
    this.userCache.user = userData;
    this.saveData(this.userCache);
  }

  public resetPassword(email: string) {

  }

  public changePassword(currentPassword: string, newPassword: string) {

  }

  public refreshToken() {

  }

  public oAuth(token: string) {

  }

}
