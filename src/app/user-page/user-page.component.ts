import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
    username: string;

    constructor(authService: AuthService) {
        if (authService.isLoggedIn) {
            const parsedUsername = JSON.parse(localStorage.getItem('signed_user'))?.name;
            this.username = parsedUsername ? parsedUsername : '';
        }
    }

    ngOnInit(): void {
    }

    logOut() {
        localStorage.removeItem('auth_token');
    }
}
