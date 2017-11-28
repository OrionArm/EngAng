import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'app';
  private url = environment.api;

  constructor(private http: HttpClient) {}

  public getProducts() {

    this.http.get(this.url).subscribe((res) => {
      console.log(res);
    });

  }
}
