import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../_services/index';
import { User } from '../_models/index';
import { UserService } from '../_services/index';


import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  ranking:User[];
  displayedColumns = ['rank', 'firstName', 'lastName', 'score'];
  dataSource: MatTableDataSource<User>;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
    private alertService:AlertService) { }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    this.userService.getRanking().subscribe(ranking => {
      this.dataSource = new MatTableDataSource(ranking);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    } );
  }

}
