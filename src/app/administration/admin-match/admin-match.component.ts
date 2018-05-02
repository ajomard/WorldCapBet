import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { MatSnackBar} from '@angular/material';
import { Matches } from '../../_models/index';
import { Team } from '../../_models/index';
import { UserService, MatchesService, DataService, TeamService } from '../../_services/index';

@Component({
  selector: 'app-admin-match',
  templateUrl: './admin-match.component.html',
  styleUrls: ['./admin-match.component.css']
})
export class AdminMatchComponent implements OnInit {
  match: Matches;
  matchForm: FormGroup;
  teams: Team[];
  filteredTeams1: Observable<Team[]>;
  filteredTeams2: Observable<Team[]>;
  constructor(
      private router: Router,
      private userService: UserService,
      private matchService: MatchesService,
      private teamService: TeamService,
      public snackBar: MatSnackBar,
      private dataService: DataService) { }

      ngOnInit() {
        this.teamService.getAll().subscribe(teams => {
          this.teams = teams;

          this.filteredTeams1 = this.matchForm.controls['team1'].valueChanges
              .pipe(
                startWith<string | Team>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this.filterTeam(name) : this.teams.slice())
              );
          this.filteredTeams2 = this.matchForm.controls['team2'].valueChanges
                  .pipe(
                    startWith<string | Team>(''),
                    map(value => typeof value === 'string' ? value : value.name),
                    map(name => name ? this.filterTeam(name) : this.teams.slice())
                  );
        });


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

           ]),
           'scoreTeam2': new FormControl(this.match.scoreTeam2, [

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

      filterTeam(val: string): Team[] {
        return this.teams.filter(team =>
          team.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
      }

      displayFn(team?: Team): string | undefined {
         return team ? team.name : undefined;
       }


}
