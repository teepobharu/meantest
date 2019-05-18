import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { AuthRouterModule } from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AngularMaterialModule,
        AuthRouterModule
    ]

})
export class AuthModule { }