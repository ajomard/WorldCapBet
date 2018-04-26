import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../_services/index';
import { Matches } from '../_models/index';
import { BetComponent } from '../bet/bet.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:Matches[];

  constructor(private matchesService: MatchesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getNotStarted();
  }

  getNotStarted(): void {
    this.matchesService.getAll().subscribe(matches => this.matches = matches);
  }

  openBetModal(match:Matches) {
    const modal = this.modalService.open(BetComponent, { windowClass: 'dark-modal', centered: true });
    modal.componentInstance.match = match;
    modal.componentInstance.createBet(match);
  }

}
