import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './singup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    isLoading = false;
    private authStatusSub: Subscription;
    constructor(public authService: AuthService) { }
    ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onSignup(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.createUser(form.value.email, form.value.password);
        console.log(form);
    }
    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}