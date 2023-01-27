import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { NormalGuardGuard } from './guard/normal-guard.guard';
import { AdminContentComponent } from './pages/adminp/admin-content/admin-content.component';
import { DashboardComponent } from './pages/adminp/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/adminp/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

// all the routing url comes here 
const routes: Routes = [
  {
    path:'signup',
    component : SignupComponent,
    pathMatch:'full'
  },{
    path :'',
    component : HomeComponent,
    pathMatch :'full'
  },
  {
    path:'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path : 'admin',
    component : DashboardComponent,
    canActivate :[AdminGuardGuard],
    children:[
      {
        path:'',
        component : WelcomeComponent
      },
      {
        path:'profile',
        component : ProfileComponent,
      }
    ]
  },
  {
    path : 'user',
    component : UserDashboardComponent,
    pathMatch : 'full',
    canActivate : [NormalGuardGuard]
  },
  {
    path:'user/profile',
    component : ProfileComponent,
    pathMatch :'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
