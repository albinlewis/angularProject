import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private authservice: AuthService, private route: Router, public snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }


    logout() {
        this.authservice.logout();
        this.snackBar.open('Logout', 'succeed', {
            duration: 2000,
        });
        this.route.navigate(['/login']);

    }

}
