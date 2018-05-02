import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ResultsComponent } from './results/results.component';
import { MatchesComponent } from './matches/matches.component';
import { UsersComponent } from './administration/users/users.component';
import { AdminListMatchesComponent } from './administration/admin-list-matches/admin-list-matches.component';
import { AdminListTeamsComponent } from './administration/admin-list-teams/admin-list-teams.component';
import { AdminMatchComponent } from './administration/admin-match/admin-match.component';
import { AdminTeamComponent } from './administration/admin-team/admin-team.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
    { path: 'matches', component: MatchesComponent, canActivate: [AuthGuard] },
    { path: 'admin/users', component: UsersComponent , canActivate: [AuthGuard] },
    { path: 'admin/matches', component: AdminListMatchesComponent , canActivate: [AuthGuard] },
    { path: 'admin/match/create', component: AdminMatchComponent , canActivate: [AuthGuard] },
    { path: 'admin/match/edit', component: AdminMatchComponent , canActivate: [AuthGuard] },
    { path: 'admin/teams', component: AdminListTeamsComponent , canActivate: [AuthGuard] },
    { path: 'admin/team/create', component: AdminTeamComponent , canActivate: [AuthGuard] },
    { path: 'admin/team/edit', component: AdminTeamComponent , canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
