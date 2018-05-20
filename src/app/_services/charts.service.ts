import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChartAverage } from '../_models/index';

@Injectable()
export class ChartsService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAverageStats(userId: string) {
        return this.http.get<ChartAverage>(this.apiUrl + 'Rankings/ChartsAverage/' + userId);
    }

}
