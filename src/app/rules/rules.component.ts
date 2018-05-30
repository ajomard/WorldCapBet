import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {


  constructor(public authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }

}
