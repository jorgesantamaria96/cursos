import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Regístrate';
    this.user = new User();
    this.status = '';
  }

  ngOnInit(): void {
    console.log('Componente de registro cargado');
    console.log(this._userService.test());
  }

  onSubmit(form: NgForm) {
    this._userService.register(this.user).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 'success') {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      (error: any) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
