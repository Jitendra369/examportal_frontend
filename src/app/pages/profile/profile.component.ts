import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/User';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : any;
  constructor(private loginService : LoginServiceService ){
    this.user = [];
  }

  ngOnInit(): void {
    // this.user = this.loginService.getUser();

    this.user = this.loginService.getTheCurrentUser().subscribe(
      (data : any)=>{
        this.user = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  


}
