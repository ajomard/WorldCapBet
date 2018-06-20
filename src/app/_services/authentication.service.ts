import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {User} from '../_models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    login(user:User) {
        return this.http.post<any>(this.apiUrl + '/Auth/login', user);
          /*  .subscribe(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                  let userObj = JSON.parse(user);
                  if(userObj.auth_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser',user );
                  }
                }
                return user;
            })*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getLoggedUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    isLogged() {
      return this.getLoggedUser() != null;
    }

    isAdmin() {
      let user = this.getLoggedUser();
      return user != null && user.role == 'Admin';
    }
}
