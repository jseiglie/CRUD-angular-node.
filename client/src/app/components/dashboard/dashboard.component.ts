import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.services';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Users: User[] = [];
  user = localStorage.getItem("user")


constructor(private _userService: UserService) { }
  ngOnInit(): void {
    this.checkAuth();
    this.getUsers();
  }
//checking the user is logged in on localstorage
  checkAuth() {
    if (!localStorage.getItem("user")) location.replace("http://localhost:4200/")
  }
//gets all users
  getUsers() {
    this._userService.getUsers().subscribe((data: User[]) => {
      this.Users = data;
    })

  }
//del user
  delUser(id: number) {
    this._userService.delUser(id).subscribe(() => {
      this.getUsers();
    })
  }
}
