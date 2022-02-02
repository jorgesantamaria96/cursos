import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class IdentityGuard implements CanActivate {
  constructor(private _router: Router, private _userService: UserService) {}

  canActivate() {
    let user = this._userService.getIdentity();

    if (user) {
      return true;
    } else {
      this._router.navigate(['/error']);
      return false;
    }
  }
}
