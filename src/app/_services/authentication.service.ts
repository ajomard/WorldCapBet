import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

    login(username: string, password: string) {
        this.spinner.show();
        return this.http.post<any>(this.apiUrl + '/Users/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.spinner.hide();
                return user;
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getLoggedUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    isAdmin() {
      return this.getLoggedUser().username == 'akubler';
    }
}
