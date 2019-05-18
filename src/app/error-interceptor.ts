//Authentication Clip 12
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';
import { Injectable } from '@angular/core';

@Injectable()
//Only need to use authservice 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "An unknown error occured!";
                if (error.error.message) {
                    errorMessage = error.error.message
                }
                console.log(errorMessage);
                this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
                // alert(errorMessage);
                return throwError(error);
            }
            ));
    }
}