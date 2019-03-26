import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private userId: string;
    private isAuthenticated = false;
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {

    }

    getToken() {
        return this.token;
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    getIsAuth() {
        return this.isAuthenticated;
    }
    getUserId() {
        console.log(this.userId);
        return this.userId;
    }
    createUser(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        return this.http.post(BACKEND_URL + "/user/signup", authData)
            .subscribe(result => {
                this.router.navigate['/'];
                console.log(result);
            },
                (error) => {
                    this.authStatusListener.next(false);
                    console.log(error);
                }
            )
    }
    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post<{ token: string; expiresIn: number, userId: string }>(BACKEND_URL + "/user/login", authData)
            .subscribe(response => {
                console.log(response);
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    //Save to Local Storage
                    this.saveAuthData(token, expirationDate, this.userId);
                    console.log(expirationDate);
                    this.router.navigate(['/']);
                }
            },
                error => {
                    this.authStatusListener.next(false);
                    console.log(error);
                });
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        console.log(authInformation);
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000); //setTimer (in sec)
            this.authStatusListener.next(true);
        }
    }
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.userId = null;
        this.router.navigate(['/']);
    }
    private setAuthTimer(duration: number) {
        console.log("Setting log out duration (sec): " + duration)
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000)
    }
    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString()); //serialization form of the date which can be used to read later
        localStorage.setItem('userId', userId);

    }
    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }
    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}