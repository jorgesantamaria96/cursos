import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity: any;
  public token: any | null;

  constructor(private _http: HttpClient) {
    this.url = global.url;
    this.token = '';
  }

  public test() {
    return 'Hola mundo desde un servicio';
  }

  register(user: User): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'register', params, { headers: headers });
  }

  signup(user: User, getToken: any = null): Observable<any> {
    if (getToken) {
      user.getToken = true;
    }

    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  update(token: string, user: User): Observable<any> {
    // Tuve que formatear los datos de ésta manera ya que no reconocía la tabla sub en users
    let json = JSON.stringify({
      name: user.name,
      surname: user.surname,
      email: user.email,
      description: user.description,
      image: user.image,
    });
    let params = 'json=' + json;
    console.log(params);

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'user/update', params, {
      headers: headers,
    });
  }

  getIdentity(): User {
    let identity: User =
      typeof localStorage.getItem('identity') === 'string'
        ? JSON.parse(localStorage.getItem('identity') || '{}')
        : null;

    if (identity && identity !== undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken(): string {
    let token = localStorage.getItem('token');

    if (token && token !== undefined) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getUserPosts(id: number): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'post/user/' + id, { headers: headers });
  }

  getUser(id: number): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.get(this.url + 'user/detail/' + id, { headers: headers });
  }
}
