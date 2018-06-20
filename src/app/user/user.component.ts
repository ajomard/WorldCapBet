import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    model: any= {};
    loading = false;
    passwordverification: "";
    userForm: FormGroup;
    hidePassword = true;
    hidePassword2 = true;
    isLoadingResults = false;

    constructor(
        private router: Router,
        private userService: UserService,
        public snackBar: MatSnackBar,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
      this.loadUser();
      this.userForm = new FormGroup({
         'firstName': new FormControl(this.model.firstName, [
           Validators.required
         ]),
         'lastName': new FormControl(this.model.lastName, [
           Validators.required
         ]),
         'email': new FormControl({value: this.model.email, disabled: true}, [
           Validators.required,
           Validators.pattern('^[a-zA-Z0-9_.+-]+@capgemini\.com$')
         ]),
         'password': new FormControl(this.model.password, [
           Validators.required
         ]),
         'password2': new FormControl(this.passwordverification, [
           Validators.required
         ]),
       }, this.passwordMatchValidator);
    }

    loadUser() {
      this.isLoadingResults = true;
      let loggedUser = this.authenticationService.getLoggedUser();
      this.userService.getById(loggedUser.id).subscribe(user => {
        this.model = user;
        this.model.id = loggedUser.id;
        this.isLoadingResults = false;
      });

    }

    update() {
        this.isLoadingResults = true;
        this.userService.update(this.model)
            .subscribe(
                data => {
                    this.isLoadingResults = false;
                    this.openSnackBar('User updated', 5000);
                    //this.router.navigate(['/']);
                },
                error => {
                  //get first error
                  var error = Object.values(error.error)[0][0];
                  this.openSnackBar(error, 10000);
                  this.isLoadingResults = false;
                });
    }

    getErrorEmailMessage() {
     return this.userForm.controls['email'].hasError('required') ? 'You must enter a value' :
         this.userForm.controls['email'].hasError('pattern') ? 'Not a valid email (must be a capgemini mail)' : '';
    }

    passwordMatchValidator(g: FormGroup) {
       return g.get('password') && g.get('password2') && g.get('password').value === g.get('password2').value
          ? null : {'mismatch': true};
    }

    openSnackBar(message: string, time: number) {
      this.snackBar.open(message,'Close', {
        duration: time,
      });
    }
}
