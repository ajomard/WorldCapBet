import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatchesService, PronosticService } from '../_services';
import { Matches, Pronostic } from '../_models';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match: Matches;
  pronos: Pronostic[];
  baseHrefForImages = environment.baseHrefForImages;

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

}
