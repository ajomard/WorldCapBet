import { Component, OnInit, Input } from '@angular/core';
import { TeamRanking } from '../../_models';
import { MatTableDataSource } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MatchesService } from '../../_services';

@Component({
  selector: 'app-group-ranking',
  templateUrl: './group-ranking.component.html',
  styleUrls: ['./group-ranking.component.css']
})
export class GroupRankingComponent implements OnInit {
  displayedColumns = ["team", "win", "draw", "loose", "goalaverage", "score"];
  dataSource: MatTableDataSource<TeamRanking>;
  isLoadingResults = false;
  baseHrefForImages = environment.baseHrefForImages;
  @Input()
  groupName:string;

  constructor(private matchService:MatchesService) { }

  ngOnInit() {
    this.loadGroupResults(this.groupName);
  }

  loadGroupResults(group:string) {
    this.isLoadingResults = true;
    this.matchService.getGroupRanking(this.groupName).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.isLoadingResults = false;
    });
  }

}
