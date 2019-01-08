import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user = new User();
  private userError: User;
  private isCreated: boolean = false;
  private userExist: boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit() {
  }
  createUser() {
    this._userService.createUser(this.user).subscribe(
      data => {
        console.log(data);
        this.user = new User();
        this.isCreated= true;
        this.userExist = false;
      },
      error => {
        console.log(error);
        this.userError = error.error;
        this.isCreated = false;
        if (error.status ==409) {
          this.isCreated = false;
          this.userExist = true;
          this.userError = new User();
        }

      }
    )
  } 
}
