import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, PostService],
})
export class ProfileComponent implements OnInit {
  public url: string = global.url;
  public posts: Array<Post> = [];
  public user: User = new User();
  public user_profile: User = new User();
  public status: string = '';
  public token: string = '';

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
    this.getProfile();
  }

  getProfile() {
    this._route.params.subscribe((params) => {
      let id = +params.id;
      this.getUserHisProfile(id);
      this.getPosts(id);
    });
  }

  getUserHisProfile(userId: number) {
    this._userService.getUser(userId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.user_profile = response.user;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPosts(userId: number) {
    this._userService.getUserPosts(userId).subscribe(
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
        this.getProfile();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
