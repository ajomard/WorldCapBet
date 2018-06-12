import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches-view',
  templateUrl: './matches-view.component.html',
  styleUrls: ['./matches-view.component.css']
})
export class MatchesViewComponent implements OnInit {

  navLinks = [
    {path: '/matches/list', label: 'List'},
    {path: '/matches/groups', label: 'Groups'},
    {path: '/matches/knockout', label: 'Knockout Phase'}
  ];


  constructor() { }

  ngOnInit() {
  }

}
