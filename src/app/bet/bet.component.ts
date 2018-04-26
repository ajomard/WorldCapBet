import {Component, ViewEncapsulation, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Matches } from '../_models/index';
import { Pronostic } from '../_models/index';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  @Input() match:Matches;
  @Input() pronostic:Pronostic;
  constructor(public activeModal: NgbActiveModal, public authenticationService: AuthenticationService) { }

  createBet(match:Matches){
    this.pronostic = {};
    this.pronostic.idUser = this.authenticationService.getLoggedUser().id;
    this.pronostic.idMatch = match.id;

  }
}
