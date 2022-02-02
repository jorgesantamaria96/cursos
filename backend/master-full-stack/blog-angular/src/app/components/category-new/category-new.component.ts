import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService],
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public status: string;
  public user: User;
  public token: string;
  public category: Category;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Crear Nueva Categoría';
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category();
    this.status = '';
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this._categoryService.create(this.token, this.category).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'success') {
          this.status = response.status;
          this.category = response.category;

          setTimeout(() => {
            this._router.navigate(['/inicio']);
          }, 100);
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
