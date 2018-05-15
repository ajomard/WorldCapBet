import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchesService } from '../_services/index';
import { RankingService } from '../_services/index';
import { AuthenticationService } from '../_services/index';
import { UserService } from '../_services/index';
import { Matches } from '../_models/index';
import { User } from '../_models/index';
import { Pronostic } from '../_models/index';
import { Ranking } from '../_models/index';
import { BetComponent } from '../bet/bet.component';
import * as moment from 'moment';

import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  displayedColumns = ['team1', 'team2', 'pronostic','action'];
  displayedColumnsRank = ['rank','score','goodPronosticAndGoodScore','goodGoalAverage','goodPronosticOnly','falsePronostic' ];
  dataSource: MatTableDataSource<Matches>;
  dataSourceRank: MatTableDataSource<Ranking>;
  isLoadingResults = false;
  isLoadingResultsRank = false;
  isFilterOn = true;
  missingBetsNumber: number;
  baseHrefForImages = environment.baseHrefForImages;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    private rankingService: RankingService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getTodayMatchesAndPronostics();
    this.getUserRanking();
  }

  getTodayMatchesAndPronostics() {
    this.isLoadingResults = true;
    let userid = this.authenticationService.getLoggedUser().id;
    this.matchesService.getTodayMatchesAndPronostics(userid).subscribe(matches => {
      this.dataSource = new MatTableDataSource(matches);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'team1': return item.team1.name;
          case 'team2': return item.team2.name;
          default: return item[property];
        }
      };
      this.calculateMissingBets(matches);
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    },
    error => {
        //this.openSnackBar('Error while loading matches', 10000);
        this.isLoadingResults = false;
    });
  }

  getUserRanking() {
    this.isLoadingResultsRank = true;
    let userid = this.authenticationService.getLoggedUser().id;
    this.rankingService.getUserRanking(userid).subscribe(ranking => {
      this.dataSourceRank = new MatTableDataSource(ranking);
      this.isLoadingResultsRank = false;
    },
    error => {
        //this.openSnackBar('Error while loading matches', 10000);
        this.isLoadingResultsRank = false;
    });
  }

  openDialog(match:Matches) {
    const dialogRef = this.dialog.open(BetComponent, {
      data: match
    });
  }

  calculateMissingBets(matches:Matches[]) {
    this.missingBetsNumber = 0;
    for(let match of matches) {
      if(!this.isPronostic(match)) {
        this.missingBetsNumber++;
      }
    }
  }

  isPronostic(match:Matches): boolean {
    return match.pronostic != null;
  }

  isMatchAlreadyPlayed(match:Matches): boolean {
    return moment(match.date) <= moment();
  }

}
