import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from "../../services/global";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public page_title: string = '';
  public user: User;
  public token: string;
  public status: any;
  public url: string;
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload',
      method: 'POST',
      headers: {
        "Authorization": this._userService.getToken(),
      }
    },
    theme: 'dragNDrop',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivos',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastra aquí',
      attachPinBtn: 'Sube tu avatar de usuario...',
      afterUploadMsg_success: 'Subido correctamente!',
      afterUploadMsg_error: 'Upps! Ocurrió un error',
      sizeLimit: 'Límite de tamaño',
    },
  };
  public resetVar: boolean = true;

  constructor(private _userService: UserService) {
    this.page_title = 'Ajustes';
    this.url = global.url;
    this.user = new User();
    this.token = this._userService.getToken();

    // RELLENAR OBJETO USUARIO
    this.user = this._userService.getIdentity();
  }

  ngOnInit(): void {}

  avatarUpload(datos: any) {
    let data = JSON.parse(datos.response);
    console.log(data);
    this.user.image = data.image;
    console.log(this.user);
  }

  onSubmit(form: NgForm) {
    this._userService.update(this.token, this.user).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          // Actualizo el status
          this.status = response.status;

          // Nuevo usuario a guardar en el localStorage
          let user: User = new User();

          // Completo el usuario con los datos generales del usuario
          user = this.user;

          // Realizo los cambios según lo que me llega de api
          user.description = response.changes.description
            ? response.changes.description
            : this.user.description;
          user.email = response.changes.email
            ? response.changes.email
            : this.user.email;
          user.name = response.changes.name
            ? response.changes.name
            : this.user.name;
          user.surname = response.changes.surname
            ? response.changes.surname
            : this.user.surname;

          // Modifico el usuario que está en el localStorage
          localStorage.setItem('identity', JSON.stringify(user));
        } else {
          this.status = 'error';
        }
      },
      (error: HttpErrorResponse) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
}
