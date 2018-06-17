import { Component, OnInit } from '@angular/core';
import { GroupingBar } from '../../_models';
import { AuthenticationService, ChartsService } from '../../_services';

@Component({
  selector: 'app-pronostics',
  templateUrl: './pronostics.component.html',
  styleUrls: ['./pronostics.component.css']
})
export class PronosticsComponent implements OnInit {
  chartStats: GroupingBar[] = [];
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
    this.loadAverageChart();
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

}
