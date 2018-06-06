import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authservice: AuthService, public snackBar: MatSnackBar, private route: Router) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup(
            {
                'email': new FormControl(null, [Validators.email, Validators.required]),
                'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
                'loggedIn': new FormControl(null)
            }
        );
    }

    onSubmit() {
        this.authservice.login(this.loginForm.value)
            .then(r => {
                this.snackBar.open('Login', 'succeed', {
                    duration: 3000,
                });
                this.route.navigate(['/profile']);
            }).catch(err => {
                this.snackBar.open('Login', 'failed', {
                    duration: 3000,
                });

                console.log(err);
            });
    }

}
