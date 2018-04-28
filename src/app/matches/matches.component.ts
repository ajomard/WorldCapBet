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
  isLoadingResults = true;

  //@ViewChild(MatPaginator) paginator: MatPaginator;
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

      dialogRef.afterClosed().subscribe(result => {
      //  if(result != null)
          //match.pronostic = result;
      });
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  getAllMatchesAndPronostics() {
    let userid = this.authenticationService.getLoggedUser().id;
    this.userService.getAllMatchesAndPronostics(userid).subscribe(matches => {
      //this.matches = matches
      this.dataSource = new MatTableDataSource(matches);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
      //this.sortByDate();
    });
  }

  /*getPronostics() {
    let userid = this.authenticationService.getLoggedUser().id;
    this.userService.getPronostics(userid).subscribe(pronostics => this.pronostics = pronostics);
  }*/



  isMatchAlreadyPlayed(match:Matches): boolean {
    return moment(match.date) <= moment();
  }

  isPronostic(match:Matches): boolean {
    return match.pronostic.scoreTeam1 != null && match.pronostic.scoreTeam2 != null;
  }

  isMatchScore(match:Matches): boolean {
    return match.scoreTeam1 != null && match.scoreTeam2 != null;
  }

  /*sortByDate(): void {
    this.matches = this.matches.sort((a: Matches, b: Matches) => {
        return moment(a.date).valueOf() - moment(b.date).valueOf();
    })
  }*/

  delete(match:Matches) {
    this.matchesService.delete(match).subscribe(
        data => {

            this.alertService.success('Match Deleted');
        },
        error => {
            this.alertService.error(error.error);
        });;
  }

}
