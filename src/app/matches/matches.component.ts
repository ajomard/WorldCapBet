import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchesService } from '../_services/index';
import { AuthenticationService } from '../_services/index';
import { UserService } from '../_services/index';
import { Matches } from '../_models/index';
import { User } from '../_models/index';
import { Pronostic } from '../_models/index';
import { BetComponent } from '../bet/bet.component';
import * as moment from 'moment';

import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../environments/environment';


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
  baseHrefForImages = environment.baseHrefForImages;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.getAllMatchesAndPronostics();
    }

    openDialog(match: Matches) {
      const dialogRef = this.dialog.open(BetComponent, {
        data: match
      });
    }

    goTo(match: Matches) {
      this.router.navigate(['/match', match.id]);
    }

    changeFilter() {
      this.isFilterOn = !this.isFilterOn;
      this.getAllMatchesAndPronostics();
    }

  getAllMatchesAndPronostics() {
    this.isLoadingResults = true;
    let userid = this.authenticationService.getLoggedUser().id;
    this.matchesService.getAllMatchesAndPronostics(userid).subscribe(matches => {
      let matchsResults = [];
      if (this.isFilterOn) {
        for (let match of matches) {
          if (!this.isMatchAlreadyPlayed(match)) {
            matchsResults.push(match);
          }
        }
      } else {
        matchsResults = matches;
      }
      this.dataSource = new MatTableDataSource(matchsResults);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'team1': return item.team1.name;
          case 'team2': return item.team2.name;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    },
    error => {
        // this.openSnackBar('Error while loading matches', 10000);
        this.isLoadingResults = false;
    });
  }

  isMatchAlreadyPlayed(match: Matches): boolean {
    return moment(match.date) <= moment();
  }

  isPronostic(match: Matches): boolean {
    return match.pronostic != null;
  }

  isMatchScore(match: Matches): boolean {
    return match.scoreTeam1 != null && match.scoreTeam2 != null;
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'Close', {
      duration: time,
    });
  }

}
