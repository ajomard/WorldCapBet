import { User } from '../_models/index';

export class Ranking {
    id: number;
    user: User;
    rank: number;
    score: number;
    falsePronostic: number;
    goodPronosticOnly: number;
    goodGoalAverage: number;
    goodPronosticAndGoodScore: number;
}
