import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators} from '@angular/forms';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    passwordverification: "";

    email = new FormControl('', [Validators.required, Validators.email]);
    passwordVerificationControl = new FormControl('', [Validators.required]);

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.error);
                    this.loading = false;
                });
    }

    getErrorEmailMessage() {
     return this.email.hasError('required') ? 'You must enter a value' :
         this.email.hasError('email') ? 'Not a valid email' : '';
   }

   getErrorPasswordMessage() {
     return 'test';
   }
}
