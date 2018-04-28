import {Component, Input, Inject, OnInit} from '@angular/core';

import { Matches } from '../_models/index';
import { Pronostic } from '../_models/index';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';
import { PronosticService } from '../_services/index';
import { AlertService } from '../_services/index';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  //@Input() match:Matches;
  pronosticTmp: Pronostic;

  constructor(public authenticationService: AuthenticationService,
   private pronosticService: PronosticService,
   private alertService: AlertService,
   public dialogRef: MatDialogRef<BetComponent>,
   @Inject(MAT_DIALOG_DATA) public data: Matches) { }

   ngOnInit() {
     this.pronosticTmp = Object.assign({}, this.data.pronostic);
   }

  saveBet() {
    this.pronosticService.update(this.pronosticTmp).subscribe(
        data => {
          this.data.pronostic = this.pronosticTmp;
          this.close();
        },
        error => {
          this.close();
        });
  }

  close() {
    this.dialogRef.close();
  }
}
