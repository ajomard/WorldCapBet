import { Component, OnInit } from '@angular/core';
import { Bar } from '../../_models';
import { ChartsService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  chart: Bar[] = [];
  isLoadingResults = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  view: number[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private chartsService: ChartsService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadChartScore();
  }

  loadChartScore() {
    this.isLoadingResults = true;
    const userid = this.authenticationService.getLoggedUser().id;
    this.chartsService.getAverageScore(userid).subscribe(chart => {
      this.chart = chart;
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }
}
