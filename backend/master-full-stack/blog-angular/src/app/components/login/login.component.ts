import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: string = "";
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User();
    this.status = '';
  }

  ngOnInit(): void {
    // SE EJECUTA SIEMPRE Y CIERRA SESIÓN SÓLO CUANDO LE LLEGA SURE POR URL
    this.logout();
  }

  onSubmit(form: NgForm) {
    this._userService.signup(this.user).subscribe(
      response => {
        // TOKEN
        this.token = response;

        // OBJETO USUARIO iDENTIFICADO
        this._userService.signup(this.user, true).subscribe(
          response => {
            console.log(response);
            this.identity = response;
            
            // PERSISTIR DATOS USUARIO IDENTIFICADO
            console.log(this.token);
            console.log(this.identity);
            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            // REDIRIGIR AL INICIO
            this._router.navigate(["/inicio"]);
          },
          error => {
            this.status = 'error';
            console.log(error);
          }
        );
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = '';

        // REDIRECCIÓN A INICIO
        this._router.navigate(['/inicio']);
      }
    })
  }
}
