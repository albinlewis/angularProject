import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    able = true;

    constructor(private authservice: AuthService, public snackBar: MatSnackBar, private route: Router) {
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'email': new FormControl(null, [Validators.email, Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),

        });
    }

    onSubmit() {
        this.authservice.register(this.registerForm.value)
            .subscribe((response) => {
                    console.log('response');
                    this.snackBar.open('Register', 'succeed', {
                        duration: 2000,
                    });
                    this.route.navigate(['/login']);

                },
                (err) => {
                    this.snackBar.open('Register', 'failed', {
                        duration: 2000,
                    });

                    console.log(err);
                }
            );

        console.log(this.registerForm.value);
    }

}
