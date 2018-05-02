import { Pronostic } from '../_models/index';
import { Team } from '../_models/index';

export class Matches {
  id: number;
  team1: Team;
  team2: Team;
  scoreTeam1: number;
  scoreTeam2: number;
  date: Date;
  pronostic:Pronostic;
}
