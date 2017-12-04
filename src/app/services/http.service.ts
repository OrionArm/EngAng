import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

@Injectable()
export class HttpService {

  constructor() { }

  // Method that creates the header options for get requests
  public getHeaderOptions(token: string) {
    let options, headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (token) {
      headers = headers.append('Authorization', `JWT ${token}`);
      options  = { headers: headers };
      console.log('my options', options);

      return options;
    }
  }

}
