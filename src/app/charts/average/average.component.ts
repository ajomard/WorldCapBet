import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../_services/index';
import { AuthenticationService } from '../../_services/index';
import { GroupingBar } from '../../_models/index';
import { Bar } from '../../_models/index';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent implements OnInit {
  chartStats: GroupingBar[];
  chartScore: Bar[];
  isLoadingResults = false;
  isLoadingResultsScore = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  view: any[] = [700, 400];
  colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};

  constructor(private chartsService: ChartsService,
              private authenticationService: AuthenticationService) {
    this.chartStats = [];
    this.chartScore = [];
  }

  ngOnInit() {
    this.loadAverageChart();
    this.loadAverageScore();
  }

  loadAverageChart() {
    this.isLoadingResults = true;
    const userid = this.authenticationService.getLoggedUser().id;
    this.chartsService.getAverageStats(userid).subscribe(chart => {
      this.chartStats = chart;
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }

  loadAverageScore() {
    this.isLoadingResultsScore = true;
    const userid = this.authenticationService.getLoggedUser().id;
    this.chartsService.getAverageScore(userid).subscribe(chart => {
      this.chartScore = chart;
      this.isLoadingResultsScore = false;
    }, error => {
      this.isLoadingResultsScore = false;
    });
  }

}
