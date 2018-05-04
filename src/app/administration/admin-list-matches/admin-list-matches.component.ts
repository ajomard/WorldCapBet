import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatchesService } from '../../_services/index';
import { AuthenticationService } from '../../_services/index';
import { UserService } from '../../_services/index';
import { DataService } from '../../_services/index';
import { Matches } from '../../_models/index';
import { User } from '../../_models/index';

import * as moment from 'moment';

import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-list-matches',
  templateUrl: './admin-list-matches.component.html',
  styleUrls: ['./admin-list-matches.component.css']
})
export class AdminListMatchesComponent implements OnInit {
  displayedColumns = ['date', 'team1', 'team2', 'score', 'action'];
  dataSource: MatTableDataSource<Matches>;
  isLoadingResults = false;
  isFilterOn = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private dataService: DataService) { }

    ngOnInit() {
      this.getAllMatches();
    }

    changeFilter() {
      this.isFilterOn = !this.isFilterOn;
      this.getAllMatches();
    }

  getAllMatches() {
    this.isLoadingResults = true;
    this.matchesService.getAll().subscribe(matches => {
      let matchsResults = [];
      if(this.isFilterOn) {
        for(let match of matches) {
          if(!this.isMatchAlreadyPlayed(match)) matchsResults.push(match);
        }
      } else {
        matchsResults = matches;
      }
      this.dataSource = new MatTableDataSource(matchsResults);
      //allow to sorte nested objects
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'team1': return item.team1.name;
          case 'team2': return item.team2.name;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    },
    error => {
        //this.openSnackBar('Error while loading matches', 10000);
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

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message,'Close', {
      duration: time,
    });
  }

  edit(match:Matches) {
    this.dataService.set(match);
    this.router.navigate(["/admin/match/edit"]);
  }

  delete(match:Matches) {
    this.matchesService.delete(match).subscribe(
        data => {
            this.getAllMatches();
            this.openSnackBar('Match Deleted',2000);
        });
  }

}
