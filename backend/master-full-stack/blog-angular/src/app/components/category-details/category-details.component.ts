import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  providers: [UserService, CategoryService, PostService],
})
export class CategoryDetailsComponent implements OnInit {
  public page_title: string = '';
  public user: User = new User();
  public token: string = '';
  public category: Category = new Category();
  public url: string = global.url;
  public posts: Array<Post> = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private _categoryService: CategoryService
  ) {
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostByCategory();
  }

  getPostByCategory() {
    this._route.params.subscribe((params) => {
      let id = params.id;

      this._categoryService.getCategory(id).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.category = response.categories;

            this._categoryService.getCategoryPosts(id).subscribe(
              (response: any) => {
                if (response.status === 'success') {
                  this.posts = response.posts;
                } else {
                  this._router.navigate(['/inicio']);
                }
              },
              (error: any) => {
                console.log(error);
              }
            );
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        (error) => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }

  deletePost(id: number) {
    this._postService.delete(this.token, id).subscribe(
      (response: any) => {
        console.log(response);
        this.getPostByCategory();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
