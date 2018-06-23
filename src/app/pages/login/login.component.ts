import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorResponse: string;
    error: boolean = false;

    logout: boolean = false;
    logoutReason: string;

    constructor(private authservice: AuthService, 
            public snackBar: MatSnackBar, 
            private router: Router,
            private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup(
            {
                'email': new FormControl(null, [Validators.email, Validators.required]),
                'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
                'loggedIn': new FormControl(null)
            }
        );

        this.route.queryParams.subscribe(params => {
            this.logout = 'true' === params["logout"];
            this.logoutReason = params["reason"];
        })
    }

    onSubmit() {
        this.authservice.login(this.loginForm.value)
            .then(r => {
                this.snackBar.open('Login', 'succeed', {
                    duration: 3000,
                });
                this.router.navigate(['/profile']);
            }).catch((err:HttpErrorResponse) => {
                this.error = true;
                if(err.status === 504 || !err.status){
                    this.errorResponse = "ERRORS.NO_CONNECTION";
                }else if(err.error){
                    this.errorResponse  = err.error.error.message;
                }else{
                    this.errorResponse = "ERRORS.LOGIN";
                }
            });
    }

}
