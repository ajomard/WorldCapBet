import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { Team } from '../../_models/index';
import { DataService, TeamService } from '../../_services/index';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css']
})
export class AdminTeamComponent implements OnInit {
  team: Team;
  teamForm: FormGroup;
  groupList: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  constructor(
      private router: Router,
      private teamService: TeamService,
      public snackBar: MatSnackBar,
      private dataService: DataService) { }

      ngOnInit() {
        this.team = this.dataService.get();
        if(this.team == null) this.team = new Team();

        this.teamForm = new FormGroup({
           'name': new FormControl(this.team.name, [
             Validators.required
           ]),
           'flag': new FormControl(this.team.flag, [
             Validators.required
           ]),
           'group': new FormControl(this.team.group, []
          )
         });

      }

      createOrUpdate() {
        if(this.team.id == null) {
          this.teamService.create(this.team).subscribe(() => {
            this.dataService.delete();
            this.openSnackBar("Team created", 2000);
            this.router.navigate(["/admin/teams"]);
          }, () => {
              this.dataService.delete();
            });
        } else {
          this.teamService.update(this.team).subscribe(() => {
            this.dataService.delete();
            this.openSnackBar("Team updated", 2000);
            this.router.navigate(["/admin/teams"]);
          }, () => {
              this.dataService.delete();
            });
        }
      }

      openSnackBar(message: string, time: number) {
        this.snackBar.open(message,'Close', {
          duration: time,
        });
      }

}
