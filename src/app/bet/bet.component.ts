import {Component, ViewEncapsulation, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Matches } from '../_models/index';
import { Pronostic } from '../_models/index';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';
import { PronosticService } from '../_services/index';
import { AlertService } from '../_services/index';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  @Input() match:Matches;
  pronosticTmp: Pronostic;

  constructor(public activeModal: NgbActiveModal,
   public authenticationService: AuthenticationService,
   private pronosticService: PronosticService,
   private alertService: AlertService) { }


  saveBet() {
    this.pronosticService.update(this.pronosticTmp).subscribe(
        data => {
            this.match.pronostic = this.pronosticTmp;
            this.alertService.success('Bet Saved');
            this.activeModal.close();
        },
        error => {
            this.alertService.error(error.error);
            this.activeModal.dismiss();
        });;
  }

  closeWithoutSave() {
    this.activeModal.dismiss();
  }
}
