import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService, PronosticService } from '../_services';
import { Matches, Pronostic } from '../_models';
import { environment } from '../../environments/environment';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match: Matches;
  baseHrefForImages = environment.baseHrefForImages;
  columnsToDisplay = ['name', 'firstName', 'score'];
  dataSource: MatTableDataSource<Pronostic>;
  isLoadingResults = false;
  @ViewChild(MatSort) sort: MatSort;
  totalProno;
  victoryTeam1;
  victoryTeam2;
  draw;
  score4;
  score2;
  score1;
  score0;

  constructor(
    private route: ActivatedRoute,
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
        const date = new Date();
        const dateMatch = new Date(match.date);
        if (date > dateMatch) {
          this.getPronostics();
        } else {
          this.isLoadingResults = false;
        }
      });
  }

  getPronostics(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pronosticService.getPronosticsForMatch(id)
    .subscribe(pronos => {
        this.dataSource = new MatTableDataSource(pronos);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'firstName': return item.user.firstName;
            case 'name': return item.user.lastName;
            case 'score' : return this.isRight(item);
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
        this.getPronosStats();
      }
    );
  }

  isRight(prono: Pronostic): number {
    let res = 0;
    if (this.match.scoreTeam1 != null && this.match.scoreTeam2 != null) {
      const diff = this.match.scoreTeam1 - this.match.scoreTeam2;
      const diffProno = prono.scoreTeam1 - prono.scoreTeam2;
      if (prono.scoreTeam1 === this.match.scoreTeam1 && prono.scoreTeam2 === this.match.scoreTeam2) {
        return 4;
      } else if (diff === diffProno) {
        return 2;
      } else if (diff > 0 && diffProno > 0 || diff < 0 && diffProno < 0) {
        res = 1;
      }

    } else {
      res = 0;
    }
    return res;
  }

  getPronosStats(): void {
    this.totalProno = this.dataSource.data.length;
    this.victoryTeam1 = (this.dataSource.data.filter(x => x.scoreTeam1 > x.scoreTeam2).length / this.totalProno * 100.0).toFixed(1);
    this.victoryTeam2 = (this.dataSource.data.filter(x => x.scoreTeam2 > x.scoreTeam1).length / this.totalProno * 100.0).toFixed(1);
    this.draw = (this.dataSource.data.filter(x => x.scoreTeam1 === x.scoreTeam2).length / this.totalProno * 100.0).toFixed(1);

    this.score4 = (this.dataSource.data.
      filter(x => this.isRight(x) === 4).length / this.totalProno * 100.0
    ).toFixed(1);

    this.score2 = (this.dataSource.data.
      filter(x => this.isRight(x) === 2).length / this.totalProno * 100.0
    ).toFixed(1);

    this.score1 = (this.dataSource.data.
      filter(x => this.isRight(x) === 1).length / this.totalProno * 100.0
    ).toFixed(1);

    this.score0 = (this.dataSource.data.
      filter(x => this.isRight(x) === 0).length / this.totalProno * 100.0
    ).toFixed(1);

  }

}
