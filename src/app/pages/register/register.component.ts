import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    able = true;
    errorResponse: string;
    error: boolean = false;

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
                this.registerForm.reset();
                this.route.navigate(['/login'], { queryParams: { reason: 'registered' } });
            }).catch(err => {
                this.error = true;
                if(err.status === 504 || !err.status){
                    this.errorResponse = "ERRORS.NO_CONNECTION";
                }else if(err.error){
                    this.errorResponse  = err.error.error.message;
                }else{
                    this.errorResponse = "ERRORS.REGISTER";
                }
                console.error(err);
            });
    }

}
