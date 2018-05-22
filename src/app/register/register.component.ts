import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.email, Validators.required]),
            'password': new FormControl(null, Validators.required),
            'confirmpass': new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
      console.log(this.registerForm);
    }

}
