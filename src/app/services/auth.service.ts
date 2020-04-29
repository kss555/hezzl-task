import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as jwt_decode from 'jwt-decode'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    uri = 'http://localhost:5000/api';

    constructor(private http: HttpClient,
                private router: Router) {
    }

    logIn(formValue) {
        this.http.post(`${this.uri}/authenticate`, { email: formValue.email, password: formValue.password })
            .subscribe((res: any) => {
                localStorage.setItem('auth_token', res.token);
                localStorage.setItem('signed_user', res.signed_user);
                this.router.navigate(['user']);
            });
    }

    logOut() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('signed_user');
    }

    public get isLoggedIn(): boolean {
        return localStorage.getItem('auth_token') !== null;
    }

    signUp(formValue) {
        this.http.put(`${this.uri}/new`, { name: formValue.name, email: formValue.email, password: formValue.password })
            .subscribe((res: any) => {
                console.log(res);
            });
    }

    decodeToken(): any {
        const token = localStorage.getItem('auth_token');
        return jwt_decode(token);
    }
}
