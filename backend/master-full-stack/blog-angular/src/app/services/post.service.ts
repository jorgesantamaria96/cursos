import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Post } from '../models/post';
import { global } from './global';
import { UserService } from './user.service';

@Injectable()
export class PostService {
  public url: string;
  public user: User = new User();
  public token: string = '';

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = global.url;
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  create(token: string, post: Post): Observable<any> {
    let json = JSON.stringify({
      title: post.title,
      content: post.content,
      image: post.image,
      user_id: post.user_id,
      category_id: post.category_id,
    });
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });
  }

  getPosts(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'post', { headers: headers });
  }

  getPost(id: number): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'post/' + id, { headers: headers });
  }

  update(token: string, post: Post, id: number): Observable<any> {
    let json = JSON.stringify({
      title: post.title,
      content: post.content,
      category_id: post.category_id,
      image: post.image,
    });
    let params = 'json=' + json;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'post/' + id, params, {
      headers: headers,
    });
  }

  delete(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(this.url + 'post/' + id, { headers: headers });
  }
}
