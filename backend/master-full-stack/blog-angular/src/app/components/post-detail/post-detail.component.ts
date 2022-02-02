import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [UserService, PostService],
})
export class PostDetailComponent implements OnInit {
  public page_title: string = '';
  public user: User = new User();
  public token: string = '';
  public post: Post = new Post();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPost();
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
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }
}
