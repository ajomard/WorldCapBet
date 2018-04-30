import {Component, Input, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

import { Matches } from '../_models/index';
import { Pronostic } from '../_models/index';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';
import { PronosticService } from '../_services/index';
import { AlertService } from '../_services/index';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  pronosticTmp: Pronostic;
  betForm: FormGroup;

  constructor(public authenticationService: AuthenticationService,
   private pronosticService: PronosticService,
   private alertService: AlertService,
   public dialogRef: MatDialogRef<BetComponent>,
   public snackBar: MatSnackBar,
   @Inject(MAT_DIALOG_DATA) public data: Matches) { }

   ngOnInit() {
     this.pronosticTmp = Object.assign({}, this.data.pronostic);

     this.betForm = new FormGroup({
        'scoreTeam1': new FormControl(this.pronosticTmp.scoreTeam1, [
          Validators.required,
          Validators.min(0),
          Validators.max(20)
        ]),
        'scoreTeam2': new FormControl(this.pronosticTmp.scoreTeam1, [
          Validators.required,
          Validators.min(0),
          Validators.max(20)
        ]),
      });
   }

  saveBet() {
    this.pronosticService.update(this.pronosticTmp).subscribe(
        data => {
          this.data.pronostic = this.pronosticTmp;
          this.openSnackBar('Bet saved', 2000);
          this.close();
        },
        error => {
          this.openSnackBar('Error while saving bet', 10000);
          this.close();
        });
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message,'Close', {
      duration: time,
    });
  }
}
