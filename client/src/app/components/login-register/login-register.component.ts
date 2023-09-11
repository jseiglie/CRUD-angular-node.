import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.services';
import { environment } from "environments/environments.prod";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  formloginRegister: FormGroup;
  register: boolean = false;

  constructor(private fb: FormBuilder, private _userService: UserService) {
    this.formloginRegister = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    })
  }
toggle(){
  if (this.register) {this.register= false}
  else {this.register= true}


}
loginRegister() {
  // const user: User = {
  //   username: this.formloginRegister.value.username,
  //   password: this.formloginRegister.value.password
  // }
  
  let opt: Object = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ 
      username: this.formloginRegister.value.username,
      password: this.formloginRegister.value.password}),
      withCredentials: true
}
  try {  
    if (this.register) {
      fetch(environment.endpoint+"api/user", opt).then(resp => resp.json()).then(data=>console.log(data))
    }
    else {
      console.log(environment.endpoint+"api/login")
      fetch(`${environment.endpoint}api/login`, opt)
      .then(resp =>resp.json())
      .then(data=>{
        console.log(data)
        if (data.status== "OK"){
            environment.loggedIn=true
            localStorage.setItem("user", data.user)
            environment.user=data.user
            location.replace("http://localhost:4200/dashboard")
          } 
      
      })
 
    }
  } catch (error) {
    console.log(error)
  }
}

}
