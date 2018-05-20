import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Ranking } from '../_models/index';
import { UserService, RankingService, AuthenticationService } from '../_services/index';


import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  ranking:Ranking[];
  highlightedRow = {};
  displayedColumns = ['rank', 'firstName', 'lastName', 'score','goodPronosticAndGoodScore','goodGoalAverage','goodPronosticOnly','falsePronostic' ];
  dataSource: MatTableDataSource<Ranking>;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
    private rankingService: RankingService,
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    this.rankingService.getAll().subscribe(ranking => {
      this.dataSource = new MatTableDataSource(ranking);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'firstName': return item.user.firstName;
          case 'lastName': return item.user.lastName;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.highlightedRow = this.authenticationService.getLoggedUser().id;
      this.isLoadingResults = false;
    });
  }

  updateRankings() {
    this.isLoadingResults = true;
    this.rankingService.calculateRanking().subscribe(data => {
      this.getRanking();
    });
  }

}
