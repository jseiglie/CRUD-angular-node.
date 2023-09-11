import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  formAddUser: FormGroup;


  constructor(private fb: FormBuilder, private _userService: UserService) {
    this.formAddUser= this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    })
    
  }
//add user
addUser(){
  let opt: Object = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ username: this.formAddUser.value.username,
      password: this.formAddUser.value.password}),
}
try {
  fetch(environment.endpoint+"api/user", opt)
  .then(resp => resp.json())
  .then(data=>{  
    console.log(data)
    if (data.status== "OK"){
      console.log("ok")
      location.replace("http://localhost:4200/dashboard")
    } 

})

} catch (error) {
  console.log(error)
}
}

}
