import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnChanges {
  @Input('posts')
  posts!: Array<Post>;
  @Input('user_profile')
  user_profile!: User;
  public url: string = global.url;
  public user_loged: User = new User();
  public status: string = '';
  public token: string;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.user_loged = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    setTimeout(() => {}, 1000);
  }

  ngOnChanges() {}

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
        this.getPosts(this.user_profile.sub);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
