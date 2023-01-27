import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interface/User';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userservice : UserserviceService, private _snack: MatSnackBar){

  }

  public user : User ={
    username:'',
    password :'',
    firstName :'',
    lastName :'',
    email :'',
    phoneNo :''
  }

  formSubmit(){

     console.table(this.user);

    
    // alert("form submit");
    // console.log("form submit");
    if(this.user.username =='' || this.user.username==null){
        // alert('username is requried');
        this._snack.open("username is requried",'',{
          duration: 2000
        });
        return;
    }

    // calling add user function
    this.userservice.addUser(this.user).subscribe(
      (data : any)=>{
          console.log(data); 
          Swal.fire(
            'success',
            "data is added to database ", 'success'
          )  
      },
      (error)=>{
        console.log(error);
      }
    );
    
  }

}
