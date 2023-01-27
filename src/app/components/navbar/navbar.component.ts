import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false;
  user : any = null;


  constructor(public loginService: LoginServiceService, private router: Router){}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    this.user = this.loginService.getUser();
    // here we catch the subscribe the event emmited by the subject 
    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn = this.loginService.isUserLoggedIn();
      this.user = this.loginService.getUser();
    });
  }

  logout(){
    this.loginService.logOut();
    this.router.navigate(['login']);
    this.isLoggedIn= false;
    this.user = null;
    // window.location.reload();
  }
}
