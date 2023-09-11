import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

user = localStorage.getItem("user")
constructor(){
 
}
logOut () {
  localStorage.removeItem("user")
  location.replace("http://localhost:4200/")
}

}
