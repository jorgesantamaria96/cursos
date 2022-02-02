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

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService],
})
export class PostNewComponent implements OnInit {
  public page_title: string = 'Crear una entrada';
  public status: string = '';
  public user: User = new User();
  public token: string = '';
  public post!: Post;
  public url: string;
  public categories: Array<Category> = [];
  public resetVar: boolean = false;
  public is_edit: boolean = false;
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
    this.post = new Post();
    this.post.user_id = this.user.sub;
    this.getCategories();
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
    console.log(image_data);
    this.post.image = image_data.image;
  }

  onSubmit(form: NgForm) {
    this._postService.create(this.token, this.post).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.status = response.status;
          this.post = response.post;

          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log(error);
        this.status = 'error';
      }
    );
  }
}
