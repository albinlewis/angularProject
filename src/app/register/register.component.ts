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
            .then(message => {
                console.log(message);
                this.registerForm.reset();
                this.route.navigate(['register']);
            }).catch(err => {
                this.snackBar.open('Registration', 'failed', {
                    duration: 2000,
                });
                console.log(err);
            });
    }

}
