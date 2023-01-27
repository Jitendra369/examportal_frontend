import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http"
import { catchError, Observable, map } from "rxjs";
import { User } from '../interface/User';



@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

//  todo: start here
// add user
  public addUser(user: User){
    return this.http.post( `${this.apiUrl}/user/`, user);
  }
}
