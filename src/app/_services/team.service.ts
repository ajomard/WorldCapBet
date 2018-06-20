import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class TeamService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Team[]>(this.apiUrl + 'Teams');
    }

    create(team: Team) {
      return this.http.post(this.apiUrl + 'Teams/', team);
    }

    update(team: Team) {
      return this.http.put(this.apiUrl + 'Teams/' + team.id, team);
    }

    delete(team: Team) {
      return this.http.delete(this.apiUrl + 'Teams/' + team.id);
    }

}
