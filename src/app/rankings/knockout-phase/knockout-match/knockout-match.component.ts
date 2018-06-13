import { Component, OnInit } from '@angular/core';
import { Matches } from '../../../_models';

@Component({
  selector: 'app-knockout-match',
  templateUrl: './knockout-match.component.html',
  styleUrls: ['./knockout-match.component.css']
})
export class KnockoutMatchComponent implements OnInit {

  match: Matches;
  constructor() { }

  ngOnInit() {
  }

}
