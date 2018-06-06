import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatchesService, PronosticService } from '../_services';
import { Matches, Pronostic } from '../_models';
import { environment } from '../../environments/environment';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match: Matches;
  pronos: Pronostic[];
  baseHrefForImages = environment.baseHrefForImages;
  columnsToDisplay = ['name', 'firstname', 'score'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchesService,
    private pronosticService: PronosticService
  ) { }

  ngOnInit() {
    this.getMatch();
    this.getPronostics();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getAll()
      .subscribe(matches => {
        this.match = matches.find(x => x.id === id);
        console.log(this.match.id);
      });
  }

  getPronostics(): void {
    this.pronosticService.getAll()
    .subscribe(pronos => {
        this.pronos = (pronos.filter(x => x.match.id === this.match.id));
        console.log(this.pronos);
      }
    );
  }

  isRight(prono: Pronostic): boolean {
    let res = false;
    if (this.match.scoreTeam1 && this.match.scoreTeam2) {
      const diff = this.match.scoreTeam1 - this.match.scoreTeam2;
      const diffProno = prono.scoreTeam1 - prono.scoreTeam2;

      if (diff > 0 && diffProno > 0 || diff < 0 && diffProno < 0 || diff === 0 && diffProno === 0){
        res = true;
      }

    } else {
      res = false;
    }
    return res;
  }

}
