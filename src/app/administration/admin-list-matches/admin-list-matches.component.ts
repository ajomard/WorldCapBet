import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatchesService } from '../../_services/index';
import { AuthenticationService } from '../../_services/index';
import { UserService } from '../../_services/index';
import { DataService } from '../../_services/index';
import { Matches, MatchType, MATCH_TYPE} from '../../_models/index';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

import {MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-admin-list-matches',
  templateUrl: './admin-list-matches.component.html',
  styleUrls: ['./admin-list-matches.component.css']
})
export class AdminListMatchesComponent implements OnInit {
  displayedColumns: string[];
  matchsType: MatchType[] = MATCH_TYPE;
  dataSource: MatTableDataSource<Matches>;
  isLoadingResults = false;
  isFilterOn = false;
  baseHrefForImages = environment.baseHrefForImages;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private dataService: DataService,
    private deviceService: DeviceDetectorService) {
      this.displayedColumns = this.getDisplayedColumns();
    }

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
      if (this.isFilterOn) {
        for (const match of matches) {
          if (!this.isMatchAlreadyPlayed(match)) {
            matchsResults.push(match);
          }
        }
      } else {
        matchsResults = matches;
      }
      this.dataSource = new MatTableDataSource(matchsResults);
      // Allow to sort nested objects
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
        this.isLoadingResults = false;
    });
  }

  isMatchAlreadyPlayed(match: Matches): boolean {
    return moment(match.date) <= moment();
  }

  isPronostic(match: Matches): boolean {
    return match.pronostic.scoreTeam1 != null && match.pronostic.scoreTeam2 != null;
  }

  isMatchScore(match: Matches): boolean {
    return match.scoreTeam1 != null && match.scoreTeam2 != null;
  }

  getMatchType(match: Matches): string {
    const type = match.type;
    if (type === 0) {
      let group = '';
      if (match.team1.group != null && match.team2.group != null) {
        group = ' : ' + match.team1.group;
      }
      return MATCH_TYPE.find(mt => mt.id === type).name + group;
    } else if (type > 0) {
      let title = '';
      if (match.title != null) {
        title = ' : ' + match.title;
      }
      return MATCH_TYPE.find(mt => mt.id === type).name + title;
    } else {
      return match.title != null ? match.title : '';
    }
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'Close', {
      duration: time,
    });
  }

  edit(match: Matches) {
    this.dataService.set(match);
    this.router.navigate(['/admin/match/edit']);
  }

  delete(match: Matches) {
    this.matchesService.delete(match).subscribe(
        (data) => {
            this.getAllMatches();
            this.openSnackBar('Match Deleted', 2000);
        });
  }

  getDisplayedColumns(): string[] {
    if (this.deviceService.isMobile()) {
      return ['date', 'team1', 'team2', 'score', 'action'];
    } else {
      return ['date', 'type', 'team1', 'team2', 'score', 'action'];
    }
  }

}
