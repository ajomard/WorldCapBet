import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/index';
import { UserService, AuthenticationService } from '../../_services/index';

import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['lastName', 'firstName', 'email', 'action'];
  dataSource: MatTableDataSource<User>;
  isLoadingResults = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.getUsers();
    }

    getUsers() {
      this.isLoadingResults = true;
      this.userService.getAll().subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      error => {
        //  this.openSnackBar('Error while loading users', 10000);
      });
    }

    deleteUser(user:User) {
      this.userService.delete(user.id).subscribe(() => {
        this.getUsers();
        this.openSnackBar('User deleted', 2000);
      },
      error => {
          //this.openSnackBar('Error while deleting user', 10000);
      });
    }

    openSnackBar(message: string, time: number) {
      this.snackBar.open(message,'Close', {
        duration: time,
      });
    }
}
