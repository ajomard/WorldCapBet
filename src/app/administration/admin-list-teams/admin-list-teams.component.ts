import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TeamService } from '../../_services/index';
import { AuthenticationService } from '../../_services/index';
import { UserService } from '../../_services/index';
import { DataService } from '../../_services/index';
import { User } from '../../_models/index';
import { Team } from '../../_models/index';

import * as moment from 'moment';

import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-listt-teams',
  templateUrl: './admin-list-teams.component.html',
  styleUrls: ['./admin-list-teams.component.css']
})
export class AdminListTeamsComponent implements OnInit {
  displayedColumns = ['name', 'team','action'];
  dataSource: MatTableDataSource<Team>;
  isLoadingResults = false;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private teamService: TeamService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private dataService: DataService) { }

    ngOnInit() {
      this.getTeams();
    }

  getTeams() {
    this.isLoadingResults = true;
    this.teamService.getAll().subscribe(teams => {
      this.dataSource = new MatTableDataSource(teams);
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    },
    error => {
        //this.openSnackBar('Error while loading teams', 10000);
        this.isLoadingResults = false;
    });
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message,'Close', {
      duration: time,
    });
  }

  edit(team:Team) {
    this.dataService.set(team);
    this.router.navigate(["/admin/team/edit"]);
  }

  delete(team:Team) {
    this.teamService.delete(team).subscribe(
        data => {
            this.getTeams();
            this.openSnackBar('Team Deleted',2000);
        });
  }

}
