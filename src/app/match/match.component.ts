import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatchesService, PronosticService } from '../_services';
import { Matches, Pronostic } from '../_models';
import { environment } from '../../environments/environment';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match: Matches;
  baseHrefForImages = environment.baseHrefForImages;
  columnsToDisplay = ['name', 'firstname', 'score'];
  dataSource: MatTableDataSource<Pronostic>;
  isLoadingResults = false;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchesService,
    private pronosticService: PronosticService
  ) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    this.isLoadingResults = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.get(id)
      .subscribe(match => {
        this.match = match;
        if(this.match.scoreTeam1 != null && this.match.scoreTeam2 != null) {
          this.getPronostics();
        } else {
          this.isLoadingResults = false;
        }
      });
  }

  getPronostics(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pronosticService.getPronosticsForMatch(id)
    .subscribe(pronos => {
        this.dataSource = new MatTableDataSource(pronos);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'firstName': return item.user.firstName;
            case 'name': return item.user.lastName;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.isLoadingResults = true;
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
