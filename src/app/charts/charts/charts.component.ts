import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  navLinks = [
    {path: '/charts/pronostics', label: 'Pronostics'},
    {path: '/charts/scores', label: 'Scores'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
