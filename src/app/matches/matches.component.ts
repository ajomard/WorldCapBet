import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../_services/index';
import { AuthenticationService } from '../_services/index';
import { UserService } from '../_services/index';
import { Matches } from '../_models/index';
import { User } from '../_models/index';
import { Pronostic } from '../_models/index';
import { BetComponent } from '../bet/bet.component';
import * as moment from 'moment';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:Matches[];
  pronostics:Pronostic[];
  test = {};
  constructor(private matchesService: MatchesService,
    private modalService: NgbModal,
    public authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.getAllMatchesAndPronostics();
  }

  getAllMatchesAndPronostics() {
    let userid = this.authenticationService.getLoggedUser().id;
    this.userService.getAllMatchesAndPronostics(userid).subscribe(matches => this.matches = matches);
  }

  getPronostics() {
    let userid = this.authenticationService.getLoggedUser().id;
    this.userService.getPronostics(userid).subscribe(pronostics => this.pronostics = pronostics);
  }

  openBetModal(match:Matches) {
    const modal = this.modalService.open(BetComponent, { centered: true });
    modal.componentInstance.match = match;
    modal.componentInstance.pronosticTmp = Object.assign({}, match.pronostic);
  }

  isMatchAlreadyPlayed(match:Matches): boolean {
    return moment(match.date) <= moment();
  }

}
