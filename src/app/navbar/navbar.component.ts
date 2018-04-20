import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }

}
