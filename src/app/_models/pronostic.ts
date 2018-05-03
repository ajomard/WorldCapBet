import { User } from '../_models/index';
import { Matches } from '../_models/index';

export class Pronostic {
  id?: number;
  user: User;
  match: Matches;
  scoreTeam1?: number;
  scoreTeam2?: number;
  scoring?: number;
}
