import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatchesService } from '../_services/index';
import { AuthenticationService } from '../_services/index';
import { Matches, MatchType, MATCH_TYPE, MATCH_STATUS } from '../_models/index';
import * as moment from 'moment';

import {MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BetComponent } from '../bet/bet.component';
import { Subscription, Observable, interval } from 'rxjs';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  matchsType: MatchType[] = MATCH_TYPE;
  displayedColumns = ['date', 'title', 'team1', 'team2', 'pronostic', 'score', 'action'];
  dataSource: MatTableDataSource<Matches>;
  isLoadingResults = false;
  isFilterOn = false;
  baseHrefForImages = environment.baseHrefForImages;
  private userId: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchesService: MatchesService,
    public authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.userId = this.authenticationService.getLoggedUser().id;
      this.getAllMatchesAndPronostics(this.userId, true);
      this.autoRefresh();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    autoRefresh() {
      this.subscription.add(
        interval(60000).subscribe(() => this.getAllMatchesAndPronostics(this.userId, false))
      );
    }

    openDialog(match: Matches) {
      this.dialog.open(BetComponent, {
        data: match
      });
    }

    goToDetail(match: Matches) {
      this.router.navigate(['/match', match.id]);
    }

    changeFilter() {
      this.isFilterOn = !this.isFilterOn;
      this.getAllMatchesAndPronostics(this.userId, true);
    }

  getAllMatchesAndPronostics(userid: string, displaySpinner: boolean) {
    if (displaySpinner) {
      this.isLoadingResults = true;
    }
    this.matchesService.getAllMatchesAndPronostics(userid).subscribe(matches => {
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
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'team1': return item.team1.name;
          case 'team2': return item.team2.name;
          case 'title' : return this.getMatchType(item);
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    },
    () => {
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

  isInPlay(match: Matches): boolean {
    // In play status = 1
    return match.status === 1;
  }

  isFinished(match: Matches): boolean {
    // Finished status = 2
    return match.status === 2;
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'Close', {
      duration: time,
    });
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

}
