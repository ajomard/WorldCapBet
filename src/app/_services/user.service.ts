import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';
import { Pronostic } from '../_models/index';
import { Matches } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl + '/Users');
    }

    getById(id: number) {
        return this.http.get<User>(this.apiUrl + '/Users/' + id);
    }

    create(user: User) {
        return this.http.post(this.apiUrl + '/Users', user);
    }

    update(user: User) {
        return this.http.put(this.apiUrl + '/Users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl + '/Users/' + id);
    }

    getAllMatchesAndPronostics(id: number) {
      return this.http.get<Matches[]>(this.apiUrl + '/Users/' + id +'/AllMatchAndPronostic');
    }

    getPronostics(id: number) {
        return this.http.get<Pronostic[]>(this.apiUrl + '/Users/' + id +'/pronostics');
    }
}
