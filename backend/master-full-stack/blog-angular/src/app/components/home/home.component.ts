import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService],
})
export class HomeComponent implements OnInit {
  public page_title: string = 'Inicio';
  public url: string = '';
  public user: User = new User();
  public token: string = '';
  public status: string = '';
  public posts: Array<Post> = [];

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.url = global.url;
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.status = response.status;
          this.posts = response.posts;
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

  deletePost(id: number) {
    this._postService.delete(this.token, id).subscribe(
      (response: any) => {
        console.log(response);
        this.getPosts();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
