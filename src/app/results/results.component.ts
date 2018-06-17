import { Component, OnInit, ViewChild } from '@angular/core';
import { Ranking } from '../_models/index';
import { UserService, RankingService, AuthenticationService } from '../_services/index';


import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  ranking: Ranking[];
  highlightedRow = {};
  displayedColumns: string[];
  dataSource: MatTableDataSource<Ranking>;
  isLoadingResults = true;
  userId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rankingService: RankingService,
    public authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService) {
      this.displayedColumns = this.getDisplayedColumns();
    }

  ngOnInit() {
    this.userId = this.authenticationService.getLoggedUser().id;
    this.getRanking();
  }

  getRanking() {
    this.rankingService.getAll().subscribe(ranking => {
      this.dataSource = new MatTableDataSource(ranking);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'firstName': return item.user.firstName;
          case 'lastName': return item.user.lastName;
          default: return item[property];
        }
      };

      if (!this.deviceService.isMobile()) {
        const idx = this.dataSource.data.findIndex(r => r.user.id === this.userId);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageIndex = Math.floor(idx / this.dataSource.paginator.pageSize);
      }
      this.dataSource.sort = this.sort;
      this.highlightedRow = this.userId;
      this.isLoadingResults = false;
    });
  }

  updateRankings() {
    this.isLoadingResults = true;
    this.rankingService.calculateRanking().subscribe(data => {
      this.getRanking();
    });
  }

  getDisplayedColumns(): string[] {
    if (this.deviceService.isMobile()) {
      return ['rank', 'firstName', 'lastName', 'score' ];
    } else {
      return ['rank', 'firstName', 'lastName', 'score', 'goodPronosticAndGoodScore',
       'goodGoalAverage', 'goodPronosticOnly', 'falsePronostic' ];
    }
  }

}
