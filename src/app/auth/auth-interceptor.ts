//Authentication Clip 12
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

//Only need to use authservice 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        //Clone request before manipulating
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        console.log({ original: req.clone(), intercept: authRequest });
        return next.handle(authRequest);
    }
}