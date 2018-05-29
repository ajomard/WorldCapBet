import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GroupingBar } from '../_models/index';
import { Bar } from '../_models/index';

@Injectable()
export class ChartsService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAverageStats(userId: string) {
        return this.http.get<GroupingBar[]>(this.apiUrl + 'Charts/Average/' + userId);
    }

    getAverageScore(userId: string) {
        return this.http.get<Bar[]>(this.apiUrl + 'Charts/AverageScore/' + userId);
    }

}
