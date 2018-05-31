import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material';

import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: User;
    loading = false;
    returnUrl: string;
    hidePassword = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.model = new User();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model)
            .subscribe(
                data => {
                    if (data) {
                      let userObj = JSON.parse(data);
                      if(userObj.auth_token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser',data );
                      }
                    }
                    this.loading = false;
                    this.openSnackBar('Login successful', 2000);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.openSnackBar('Wrong login / password', 5000);
                    this.loading = false;
                });
    }



    openSnackBar(message: string, time: number) {
      this.snackBar.open(message,'Close', {
        duration: time,
      });
    }
}
