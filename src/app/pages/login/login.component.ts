import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import loginData from 'src/app/interface/loginData';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData : loginData = {
    username:'',
    password:''
  }

  token : string='';

  constructor(private matSnackbar : MatSnackBar,
     private loginService: LoginServiceService){

  }

  loginUser(){
    console.log("login form submit ", this.loginData);

    // username validation
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.matSnackbar.open("username is requried",'',{
        duration : 3000
      });

      return;
    }
    

    // password validation
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.matSnackbar.open("password is requried",'',{
        duration : 3000
      });

      return;
    }

    // request reserver to generate token 

    this.loginService.generateToken(this.loginData).subscribe(
      (data : any)=>{
          console.log(data);

          // get the token , save the token 
          this.loginService.saveTokenToLocalStorage(data.token)

          // get current user 
          // to call the current user we have to pass the token, so we use interceptor
          // interceptor add the token in http header
          this.loginService.getTheCurrentUser().subscribe(
            (data : any)=>{
                this.loginService.saveUserDetails(data);
                console.log("user :", data);

                this.loginService.loginStatusSubject.next(true);
                // redirect if user is ADMIN or NORAML
                if (this.loginService.getUserRole()=='ADMIN') {
                  // admin dashboard
                  window.location.href="/admin"

                }else if(this.loginService.getUserRole()=='NORMAL'){
//                user-dashboard 
                  window.location.href="/user"
                }else{
                  this.loginService.logOut();
                }
                
            },
            (error : any)=>{
              console.log(error);
              this.loginService.logOut();
              
              this.matSnackbar.open(error,'',{
                duration : 3000
              });
              
            }
          )

      },
      (error: any)=>{
        console.log("auth error :", error);
        this.matSnackbar.open("UnAuthorized User ",'',{
          duration : 3000
        });
      }
    )
  }
}
