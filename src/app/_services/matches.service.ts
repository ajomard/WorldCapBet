import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Matches, TeamRanking } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class MatchesService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Matches[]>(this.apiUrl + 'Matches');
    }

    get(id) {
      return this.http.get<Matches>(this.apiUrl + 'Matches/' + id);
    }

    create(match: Matches) {
      return this.http.post(this.apiUrl + 'Matches/', match);
    }

    update(match: Matches) {
      return this.http.put(this.apiUrl + 'Matches/' + match.id, match);
    }

    delete(match: Matches) {
      return this.http.delete(this.apiUrl + 'Matches/' + match.id);
    }

    getAllMatchesAndPronostics(id: string) {
      return this.http.get<Matches[]>(this.apiUrl + 'Matches/Pronostic/' + id );
    }

    getTodayMatchesAndPronostics(id: string) {
      return this.http.get<Matches[]>(this.apiUrl + 'Matches/TodayPronostic/' + id );
    }

    getGroupRanking(group: string) {
      return this.http.get<TeamRanking[]>(this.apiUrl + 'Matches/GroupRanking/' + group );
    }


}
