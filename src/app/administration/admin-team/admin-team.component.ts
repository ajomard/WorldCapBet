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

import { countries, Country, State, Region } from "typed-countries";

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css']
})
export class AdminTeamComponent implements OnInit {
  team: Team;
  teamForm: FormGroup;
  country: Country;
  filteredCountry: Observable<Country[]>;
  constructor(
      private router: Router,
      private userService: UserService,
      private teamService: TeamService,
      public snackBar: MatSnackBar,
      private dataService: DataService) { }

      ngOnInit() {



        this.team = this.dataService.get();
        if(this.team == null) this.team = new Team();
        else {
          this.country = countries.find(c => c.iso === this.team.flag.toUpperCase());
        }

        this.teamForm = new FormGroup({
           'country': new FormControl(this.country, [
             Validators.required
           ])
         });

         this.filteredCountry = this.teamForm.controls['country'].valueChanges
             .pipe(
               startWith<string | Country>(''),
               map(value => typeof value === 'string' ? value : value.name),
               map(name => name ? this.filterCountry(name) : countries.slice())
             );
      }

      createOrUpdate() {
        this.team.flag = this.country.iso.toLowerCase();
        this.team.name = this.country.name;
        if(this.team.id == null) {
          this.teamService.create(this.team).subscribe(data => {
            this.dataService.delete();
            this.router.navigate(["/admin/teams"]);
          }, error => {
            //alert('ko');
            this.dataService.delete();
          });
        } else {
          this.teamService.update(this.team).subscribe(data => {
            this.dataService.delete();
            this.router.navigate(["/admin/teams"]);
          }, error => {
            //alert('ko');
            this.dataService.delete();
          });
        }
      }
      filterCountry(val: string): Country[] {
        return countries.filter(country =>
          country.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
      }

      displayFn(country: Country): string | undefined {
         return country ? country.name : undefined;
       }

      searchName() {
        let country: Country = countries.find(c => c.iso === this.team.flag);
        this.team.name = country.name;
      }
}
