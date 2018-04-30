import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchesService } from '../_services/index';
import { AuthenticationService } from '../_services/index';
import { UserService } from '../_services/index';
import { Matches } from '../_models/index';
import { User } from '../_models/index';
import { Pronostic } from '../_models/index';
import { BetComponent } from '../bet/bet.component';
import { AlertService } from '../_services/index';
import * as moment from 'moment';

import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  displayedColumns = ['date', 'team1', 'team2', 'pronostic', 'score', 'action'];
  dataSource: MatTableDataSource<Matches>;
  isLoadingResults = false;
  isFilterOn = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    public dialog: MatDialog) { }

    ngOnInit() {
      this.getAllMatchesAndPronostics();
    }

    openDialog(match:Matches) {
      const dialogRef = this.dialog.open(BetComponent, {
        data: match
      });
    }

    changeFilter() {
      this.isFilterOn = !this.isFilterOn;
      this.getAllMatchesAndPronostics();
    }

  getAllMatchesAndPronostics() {
    this.isLoadingResults = true;
    let userid = this.authenticationService.getLoggedUser().id;
    this.userService.getAllMatchesAndPronostics(userid).subscribe(matches => {
      let matchsResults = [];
      if(this.isFilterOn) {
        for(let match of matches) {
          if(!this.isMatchAlreadyPlayed(match)) matchsResults.push(match);
        }
      } else {
        matchsResults = matches;
      }
      this.dataSource = new MatTableDataSource(matchsResults);
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });
  }

  isMatchAlreadyPlayed(match:Matches): boolean {
    return moment(match.date) <= moment();
  }

  isPronostic(match:Matches): boolean {
    return match.pronostic.scoreTeam1 != null && match.pronostic.scoreTeam2 != null;
  }

  isMatchScore(match:Matches): boolean {
    return match.scoreTeam1 != null && match.scoreTeam2 != null;
  }

  filter() {

  }

  /*delete(match:Matches) {
    this.matchesService.delete(match).subscribe(
        data => {
            this.alertService.success('Match Deleted');
        },
        error => {
            this.alertService.error(error.error);
        });;
  }*/

}
