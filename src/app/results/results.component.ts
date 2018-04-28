import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/index';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  ranking:User[];
  constructor(private userService: UserService,
    private alertService:AlertService) { }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    this.userService.getRanking().subscribe(ranking => this.ranking = ranking);
  }

}
