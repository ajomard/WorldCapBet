import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ranking } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class RankingService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    calculateRanking() {
        return this.http.post(this.apiUrl + 'Rankings/UpdateRankings',null);
    }

    getAll() {
        return this.http.get<Ranking[]>(this.apiUrl + 'Rankings');
    }
}
