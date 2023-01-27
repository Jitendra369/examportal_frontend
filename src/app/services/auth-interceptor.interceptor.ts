import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login-service.service';


// const TOKEN_HEADER ='Authorization';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add the JWT-Token from the local-strage if it present in local-storage
    // get token 
    let authReq = request;
    const token  = this.loginService.getToken();
    if (token!= null) {
      // we have to make a clone because it is immutable 
      authReq = authReq.clone({
        setHeaders :{ Authorization : `Bearer ${token}`}
      })
    }

    
    return next.handle(authReq);
  }
}

export const authInterceptorProvider =[
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptorInterceptor,
    multi: true,
  },
]

