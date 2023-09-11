import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { UserService } from 'src/app/services/user.services';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formEditUser: FormGroup;
  id: any;
  params: any;
  user: any;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _userService: UserService) {
    this.formEditUser = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    })
  }
//extracts params from URL on load, then brings user data
  ngOnInit() {
    this.getParams();
    this.getUser();
  }
  //extract params from URL
  getParams() {
    this.route.params.subscribe(params => this.id = params["id"]);
  }
  // get the user info using the extracted ID from params
  async getUser() {
    const resp = await fetch(environment.endpoint + "api/user/" + this.id)
    const data = await resp.json()
    this.user = await data.user
    console.log(this.user)
  }
//edits the user
  editUser() {
    let opt: Object = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.formEditUser.value.username,
        password: this.formEditUser.value.password
      }),
    }
    try {
      this._userService.editUser(parseInt(this.id), opt)
      location.replace("http://localhost:4200/dashboard")

    } catch (error) {
      console.log(error)
    }
  }
}
