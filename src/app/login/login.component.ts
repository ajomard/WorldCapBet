import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    moduleId: module.id.toString(),
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        // reset login status
        this.spinner.show();
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.spinner.hide();
    }

    login() {
        this.loading = true;
        this.spinner.show();
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error("Wrong login / password");
                    this.loading = false;
                    this.spinner.hide();
                });
    }
}
