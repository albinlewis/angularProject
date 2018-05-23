import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private authservice: AuthService,  private route: Router) {
    }

    ngOnInit() {
    }


    logout() {
           this.authservice.logout();
           this.route.navigate(['/login']);
    }

}
