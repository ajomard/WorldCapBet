import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../_services/index';
import { AuthenticationService } from '../../_services/index';
//import { UserService } from '../_services/index';
import { ChartAverage } from '../../_models/index';
import { User } from '../../_models/index';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent implements OnInit {
  chart: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  view: any[] = [700, 400];
  colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};


  constructor(private chartsService: ChartsService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    let userid = this.authenticationService.getLoggedUser().id;
    this.chartsService.getAverageStats(userid).subscribe(chart => {
      this.chart = chart;
    });
  }

}
