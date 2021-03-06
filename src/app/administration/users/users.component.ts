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
      });
    }

    deleteUser(user: User) {
      if (confirm('Are you sure to delete : ' + user.firstName + ' ' + user.lastName)) {
        this.isLoadingResults = true;
        this.userService.delete(user.id).subscribe(() => {
          this.getUsers();
          this.openSnackBar('User deleted', 2000);
        },
        error => {
          this.isLoadingResults = false;
        });
      }
    }

    resetPassword(user: User) {
      this.isLoadingResults = true;
      this.userService.resetPassword(user).subscribe((newPassword) => {
        this.isLoadingResults = false;
        this.openSnackBar('Password resetted to : ' + newPassword, 10000);
      },
      error => {
        this.isLoadingResults = false;
      });
    }

    openSnackBar(message: string, time: number) {
      this.snackBar.open(message, 'Close', {
        duration: time,
      });
    }
}
