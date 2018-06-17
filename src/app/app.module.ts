import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AuthenticationService } from './_services/index';
import { ChartsService } from './_services/index';
import { RankingService } from './_services/index';
import { UserService } from './_services/index';
import { TeamService } from './_services/index';
import { MatchesService } from './_services/index';
import { PronosticService } from './_services/index';
import { DataService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ResultsComponent } from './results/results.component';
import { MatchesComponent } from './matches/matches.component';
import { BetComponent } from './bet/bet.component';
import { RulesComponent } from './rules/rules.component';
import { UsersComponent } from './administration/users/users.component';
import { AdminListMatchesComponent } from './administration/admin-list-matches/admin-list-matches.component';
import { AdminMatchComponent } from './administration/admin-match/admin-match.component';
import { UserComponent } from './user/user.component';

import {MatNativeDateModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';
import { AdminListTeamsComponent } from './administration/admin-list-teams/admin-list-teams.component';
import { AdminTeamComponent } from './administration/admin-team/admin-team.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MatchComponent } from './match/match.component';
import { TeamRankingComponent } from './rankings/team-ranking/team-ranking.component';
import { GroupRankingComponent } from './rankings/group-ranking/group-ranking.component';
import { MatchesViewComponent } from './matches-view/matches-view.component';
import { KnockoutPhaseComponent } from './rankings/knockout-phase/knockout-phase.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { PronosticsComponent } from './charts/pronostics/pronostics.component';
import { ScoresComponent } from './charts/scores/scores.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatCardModule,
        FlexLayoutModule,
        MatSnackBarModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatBadgeModule,
        NgxChartsModule,
        MatListModule,
        MatDividerModule,
        MatTooltipModule,
        MatSelectModule,
        MatRadioModule,
        MatTabsModule,
        DeviceDetectorModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ResultsComponent,
        MatchesComponent,
        RulesComponent,
        BetComponent,
        UsersComponent,
        AdminListMatchesComponent,
        AdminMatchComponent,
        AdminListTeamsComponent,
        AdminTeamComponent,
        UserComponent,
        MatchComponent,
        TeamRankingComponent,
        GroupRankingComponent,
        MatchesViewComponent,
        KnockoutPhaseComponent,
        ChartsComponent,
        PronosticsComponent,
        ScoresComponent
    ],
    entryComponents: [
      BetComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        MatchesService,
        PronosticService,
        DataService,
        TeamService,
        RankingService,
        ChartsService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
