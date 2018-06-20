import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';
import { Pronostic } from '../_models/index';
import { Matches } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class PronosticService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    update(pronostic: Pronostic) {
        return this.http.put(this.apiUrl + 'Pronostics/' + pronostic.id, pronostic);
    }

    create(pronostic: Pronostic) {
        return this.http.post(this.apiUrl + 'Pronostics/', pronostic);
    }

    get(id: number) {
        return this.http.get<Pronostic>(this.apiUrl + 'Pronostics/' + id);
    }

    getAll() {
        return this.http.get<Pronostic[]>(this.apiUrl + 'Pronostics/');
    }

    getPronosticsForMatch(idMatch: number) {
        return this.http.get<Pronostic[]>(this.apiUrl + 'Pronostics/match/' + idMatch);
    }
}
