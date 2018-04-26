import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../_services/index';
import { Matches } from '../_models/index';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:Matches[];

  constructor(private matchesService: MatchesService) { }

  ngOnInit() {
    this.getNotStarted();
  }

  getNotStarted(): void {
    this.matchesService.getAll().subscribe(matches => this.matches = matches);
  }

}
