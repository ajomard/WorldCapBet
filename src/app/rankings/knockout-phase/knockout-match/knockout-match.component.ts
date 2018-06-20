import { Component, OnInit, Input } from '@angular/core';
import { Matches } from '../../../_models';
import { MatchesService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knockout-match',
  templateUrl: './knockout-match.component.html',
  styleUrls: ['./knockout-match.component.css']
})
export class KnockoutMatchComponent implements OnInit {

  match: Matches;
  isLoadingResults = false;

  @Input()
  matchTitle;

  constructor(
    private matchService: MatchesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMatch(this.matchTitle);
  }

  getMatch(matchTitle: string): void {
    this.isLoadingResults = true;
    this.matchService.getAll()
      .subscribe(matches => {
        const tmp = matches.find(x => x.type === 1 && x.title === matchTitle);
        this.match = tmp;
        this.isLoadingResults = false;
      } );
  }

  goToMatch() {
    if (this.match != null) {
      this.router.navigate(['/match', this.match.id]);
    }
  }

}
