import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Category } from '../models/category';
import { global } from './global';
import { UserService } from './user.service';

@Injectable()
export class CategoryService {
  public url: string;
  public user: User = new User();
  public token: string = '';

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = global.url;
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  create(token: string, category: Category): Observable<any> {
    let json = JSON.stringify({
      name: category.name,
    });
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'category', params, { headers: headers });
  }

  getCategories(token: string): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'category', { headers: headers });
  }

  getCategory(id: number): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'category/' + id, { headers: headers });
  }

  getCategoryPosts(id: number): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'post/category/' + id, { headers: headers });
  }
}
