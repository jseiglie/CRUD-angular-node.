import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {path: "", component: LoginRegisterComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "edit/:id", component: ProfileComponent},
  {path: "add", component: AddUserComponent },
  {path: "**", component: NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
