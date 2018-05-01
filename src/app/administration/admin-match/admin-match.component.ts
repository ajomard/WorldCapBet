import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { Matches } from '../../_models/index';
import { UserService, MatchesService, DataService } from '../../_services/index';

@Component({
  selector: 'app-admin-match',
  templateUrl: './admin-match.component.html',
  styleUrls: ['./admin-match.component.css']
})
export class AdminMatchComponent implements OnInit {
  match: Matches;
  matchForm: FormGroup;
  constructor(
      private router: Router,
      private userService: UserService,
      private matchService: MatchesService,
      public snackBar: MatSnackBar,
      private dataService: DataService) { }

      ngOnInit() {
        this.match = this.dataService.get();
        if(this.match == null) this.match = new Matches();

        this.matchForm = new FormGroup({
           'date': new FormControl(this.match.date, [
             Validators.required
           ]),
           'team1': new FormControl(this.match.team1, [
             Validators.required
           ]),
           'team2': new FormControl(this.match.team2, [
             Validators.required,
           ]),
           'scoreTeam1': new FormControl(this.match.scoreTeam1, [
             Validators.required,
             Validators.min(0),
             Validators.max(20)
           ]),
           'scoreTeam2': new FormControl(this.match.scoreTeam2, [
             Validators.required,
             Validators.min(0),
             Validators.max(20)
           ])
         });
      }

      createOrUpdate() {
        if(this.match.id == null) {
          this.matchService.create(this.match).subscribe(data => {
            this.dataService.delete();
            this.router.navigate(["/admin/matches"]);
          }, error => {
            alert('ko');
            this.dataService.delete();
          });
        } else {
          this.matchService.update(this.match).subscribe(data => {
            this.dataService.delete();
            this.router.navigate(["/admin/matches"]);
          }, error => {
            alert('ko');
            this.dataService.delete();
          });
        }

      }

}
