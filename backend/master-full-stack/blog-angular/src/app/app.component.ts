import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Category } from './models/category';
import { User } from './models/user';
import { CategoryService } from './services/category.service';
import { global } from './services/global';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService],
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Blog de Angular';
  public user: User = new User();
  public url: string;
  public token: string = '';
  public categories: Array<Category> = [];

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit() {
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories(this.token).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.categories = response.categories;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
