import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatchesService } from '../_services/index';
import { RankingService } from '../_services/index';
import { AuthenticationService } from '../_services/index';
import { Matches } from '../_models/index';
import { Ranking } from '../_models/index';
import { BetComponent } from '../bet/bet.component';
import * as moment from 'moment';

import {MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns = ['team1', 'team2', 'pronostic', 'action'];
  displayedColumnsRank = ['rank', 'score', 'goodPronosticAndGoodScore', 'goodGoalAverage', 'goodPronosticOnly', 'falsePronostic' ];
  dataSource: MatTableDataSource<Matches>;
  dataSourceRank: MatTableDataSource<Ranking>;
  highlightedRow: any;
  isLoadingResults = false;
  isLoadingResultsRank = false;
  isFilterOn = true;
  missingBetsNumber = 0;
  baseHrefForImages = environment.baseHrefForImages;
  nextMatch: Matches;
  timeToNextMatch: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    private rankingService: RankingService,
    public authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
      moment.relativeTimeThreshold('s', 60 );
      moment.relativeTimeThreshold('m', 60 );
  }

  ngOnInit() {
    this.getTodayMatchesAndPronostics();
    this.getUserRanking();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTodayMatchesAndPronostics() {
    this.isLoadingResults = true;
    const userid = this.authenticationService.getLoggedUser().id;
    this.matchesService.getTodayMatchesAndPronostics(userid).subscribe(matches => {
      this.dataSource = new MatTableDataSource(matches);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'team1': return item.team1.name;
          case 'team2': return item.team2.name;
          default: return item[property];
        }
      };
      this.calculateMissingBets(matches);
      this.highlightedRow = this.authenticationService.getLoggedUser().id;
      this.dataSource.sort = this.sort;
      this.nextMatch = this.getNextMatch();
      this.getTimeToNextMatch();
      this.refreshTimeToNextMatch();
      this.isLoadingResults = false;
    },
    error => {
        this.isLoadingResults = false;
    });
  }

  getUserRanking() {
    this.isLoadingResultsRank = true;
    const userid = this.authenticationService.getLoggedUser().id;
    this.rankingService.getUserRanking(userid).subscribe(ranking => {
      this.dataSourceRank = new MatTableDataSource(ranking);
      this.isLoadingResultsRank = false;
    },
    error => {
        this.isLoadingResultsRank = false;
    });
  }

  openDialog(match: Matches) {
    this.dialog.open(BetComponent, {
      data: match
    });
  }

  goToDetail(match: Matches) {
    this.router.navigate(['/match', match.id]);
  }

  calculateMissingBets(matches: Matches[]) {
    this.missingBetsNumber = 0;
    for (const match of matches) {
      if (!this.isPronostic(match)) {
        this.missingBetsNumber++;
      }
    }
  }

  isPronostic(match: Matches): boolean {
    return match.pronostic != null;
  }

  isMatchAlreadyPlayed(match: Matches): boolean {
    return moment(match.date) <= moment();
  }

  isInPlay(match: Matches): boolean {
    // In play status = 1
    return match.status === 1;
  }

  isFinished(match: Matches): boolean {
    // Finished status = 2
    return match.status === 2;
  }

  getNextMatch(): Matches {
    return this.dataSource.data.find(m => moment(m.date).valueOf() > moment.now());
  }

  getTimeToNextMatch(): string {
    this.timeToNextMatch = '';
    // If next match already started, search next match
    if (this.nextMatch == null || moment(this.nextMatch.date).isBefore()) {
      this.getNextMatch();
    }

    if (this.nextMatch != null) {
      this.timeToNextMatch = moment(this.nextMatch.date).fromNow();
    } else {
      // No next match today, stop refreshing timer
      this.subscription.unsubscribe();
    }
    return this.timeToNextMatch;
  }

  refreshTimeToNextMatch(): void {
    this.subscription.add(
      interval(60000).subscribe(() => this.getTimeToNextMatch())
    );
  }

}
