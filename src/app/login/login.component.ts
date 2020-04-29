/* Angular */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

/* Main services */
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
    form;
    isSignUp: boolean;
    btnSubmitText = 'Вход';
    loading = false;
    showHintName = false;
    showHintEmail = false;
    showHintPassword = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthService) {
        this.isSignUp = this.router.url === '/sign-up';
        this.btnSubmitText = this.isSignUp ? 'Регистрация' : 'Вход';

        this.form = this.formBuilder.group({
            name: new FormControl({ value: '', disabled: false }, [
                    Validators.minLength(6),
                    Validators.required
                ]),
            email: new FormControl({ value: '', disabled: false }, [
                Validators.email,
                Validators.pattern('(.*\\..*)'),
                Validators.required
            ]),
            password: new FormControl({ value: '', disabled: false }, [
                Validators.minLength(6),
                Validators.pattern('(.*[A-Z].*)'),
                Validators.required
            ])
        });

        if (!this.isSignUp) {
            this.form.removeControl('name')
        }
    }

    ngOnInit(): void {
    }

    togglePassword(inputElem) {
        inputElem.type = inputElem.type === 'password' ? 'text' : 'password';
    }

    onSubmit(formValue, btnSubmit) {
        console.log('form.value: ', formValue);

        btnSubmit.style.width = '40px';
        this.loading = true;

        this.email.disable();
        this.password.disable();
        if (this.isSignUp) {
            this.name.disable();
            this.authService.signUp(formValue);
        } else {
            this.authService.logIn(formValue);
        }

        setTimeout(_ => {
            btnSubmit.style.width = '125px';
            this.form.reset();
            this.loading = false;

            this.email.enable();
            this.password.enable();

            if (this.isSignUp) {
                this.name.enable();
                this.authService.signUp(formValue);
            } else {
                this.authService.logIn(formValue);
            }

            console.warn('Your data has been submitted!');
        }, 2000);
    }

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    getInputStyle(inputElem): any {
        const borderGreen = '2px solid #AAC72E66';
        const borderRed = '2px solid #E63782';

        const isName = inputElem.id === 'name';
        const isEmail = inputElem.id === 'email';
        const isPassword = inputElem.id === 'pass';

        const isBlur = document.activeElement !== inputElem;

        const isNameDirtyAndBlur = this.name?.dirty && isName && isBlur;
        const isEmailDirtyAndBlur = this.email.dirty && isEmail && isBlur;
        const isPasswordDirtyAndBlur = this.password.dirty && isPassword && isBlur;

        const isNameDirtyOrTouched = this.name?.dirty || this.name?.touched;
        const isEmailDirtyOrTouched = this.email.dirty || this.email.touched;
        const isPasswordDirtyOrTouched = this.password.dirty || this.password.touched;

        if (this.loading) {
            return { 'border': '' };
        }

        if (isName) {
            return { 'border': this.name.valid ? (isNameDirtyAndBlur ? borderGreen : '') :
                    (isNameDirtyOrTouched ? borderRed : '') } // if this.name.invalid
        } else if (isEmail) {
            return { 'border': this.email.valid ? (isEmailDirtyAndBlur ? borderGreen : '') :
                    (isEmailDirtyOrTouched ? borderRed : '') } // if this.email.invalid
        } else if (isPassword) {
            return { 'border': this.password.valid ? (isPasswordDirtyAndBlur ? borderGreen : '') :
                    (isPasswordDirtyOrTouched ? borderRed : '') } // if this.password.invalid
        }
    }
}
