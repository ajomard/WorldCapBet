import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Matches } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class MatchesService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Matches[]>(this.apiUrl + '/Matches');
    }

    delete(match:Matches) {
      return this.http.delete(this.apiUrl + '/Matches/' + match.id);
    }

}
