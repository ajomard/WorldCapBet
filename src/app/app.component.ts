import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

import { User } from './_models/index';
import { AuthenticationService } from './_services/index';
import * as moment from 'moment';
import '../assets/app.css';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public authenticationService: AuthenticationService) {}

  close() {
    this.sidenav.close();
  }
}
