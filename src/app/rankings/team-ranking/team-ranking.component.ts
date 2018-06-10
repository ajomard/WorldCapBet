import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-ranking',
  templateUrl: './team-ranking.component.html',
  styleUrls: ['./team-ranking.component.css']
})
export class TeamRankingComponent implements OnInit {
  groupList: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  constructor() { }

  ngOnInit() {
  }

}
