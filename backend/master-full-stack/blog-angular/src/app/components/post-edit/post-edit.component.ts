import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { global } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, CategoryService, PostService],
})
export class PostEditComponent implements OnInit {
  public page_title: string = 'Editar entrada';
  public status: string = '';
  public user: User = new User();
  public token: string = '';
  public post!: Post;
  public url: string;
  public categories: Array<Category> = [];
  public resetVar: boolean = false;
  public is_edit: boolean = true;
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'post/upload',
      method: 'POST',
      headers: {
        Authorization: this._userService.getToken(),
      },
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPost();
    this.getCategories();
  }

  getPost() {
    // Sacar el id des post que viene por ruta
    this._route.params.subscribe((params) => {
      let id = +params.id;

      // Petición ajax para sacar los datos
      this._postService.getPost(id).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.post = response.posts;
            this.post.user_id !== this.user.sub
              ? this._router.navigate(['/inicio'])
              : null;
          } else {
            console.log('entra2');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    });
  }

  getCategories() {
    this._categoryService.getCategories(this.token).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.categories = response.categories;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  imageUpload(datos: any) {
    let image_data = JSON.parse(datos.response);
    this.post.image = image_data.image;
  }

  onSubmit(form: NgForm) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.status = response.status;
          this._router.navigate(['/entrada', this.post.id]);
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
