import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment.prod';
import loginData from '../interface/loginData';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private Http:HttpClient) { }

  // udapte the nav-bar componend with the current-user
  public loginStatusSubject = new Subject<boolean>();

  // generate token service
  public generateToken(loginData: loginData){
      return this.Http.post(`${environment.apiUrl}/generate_token`, loginData);
  }

  // GET THE CURRENT USER API
  public getTheCurrentUser(){
    return this.Http.get(`${environment.apiUrl}/current_user`)
  }

  // after user logged in save the token to client side
  public saveTokenToLocalStorage(token: string){
    // means user is logged in 
    localStorage.setItem('token', token);
   
    return true;
  }

  // chek if user is logged in or not
  public isUserLoggedIn(){
    let token = localStorage.getItem('token');
    if(token==null || token == undefined || token==''){
      return false;
    }else{
      return true;
    }
  }

  // logout token 
  public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // getToken from local-storage
  public getToken(){
    return localStorage.getItem('token');
  }

  // store user-information
  // stringify --> object to json 
  public saveUserDetails(user : loginData){
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user from local-storage, if user is not present then loggedOut- user
  public getUser(){
    let loggedUser = localStorage.getItem('user');
    if (loggedUser!= null) {
      return JSON.parse(loggedUser);
    }else{
      this.logOut();
    }
  }

  // get user role form user-object
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
