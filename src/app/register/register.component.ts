﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material';

import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    passwordverification: "";
    registerForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.registerForm = new FormGroup({
         'firstName': new FormControl(this.model.firstName, [
           Validators.required
         ]),
         'lastName': new FormControl(this.model.lastname, [
           Validators.required
         ]),
         'email': new FormControl(this.model.email, [
           Validators.required,
           Validators.pattern('^[a-zA-Z0-9_.+-]+@capgemini\.com$')
         ]),
         'username': new FormControl(this.model.username, [
           Validators.required
         ]),
         'password': new FormControl(this.model.password, [
           Validators.required
         ]),
         'password2': new FormControl(this.passwordverification, [
           Validators.required
         ]),
       }, this.passwordMatchValidator);
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.openSnackBar('Registration successful', 5000);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.openSnackBar(error.error, 10000);
                    this.loading = false;
                });
    }

    getErrorEmailMessage() {
     return this.registerForm.controls['email'].hasError('required') ? 'You must enter a value' :
         this.registerForm.controls['email'].hasError('pattern') ? 'Not a valid email (must be a capgemini mail)' : '';
    }

    passwordMatchValidator(g: FormGroup) {
       return g.get('password').value === g.get('password2').value
          ? null : {'mismatch': true};
    }

    openSnackBar(message: string, time: number) {
      this.snackBar.open(message,'Close', {
        duration: time,
      });
    }
}
