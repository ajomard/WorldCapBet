import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AuthenticationService, RankingService, UserService, TeamService, MatchesService, PronosticService, DataService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavbarComponent } from './navbar/navbar.component';
import { ResultsComponent } from './results/results.component';
import { MatchesComponent } from './matches/matches.component';
import { BetComponent } from './bet/bet.component';
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


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


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
        MatBadgeModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        RegisterComponent,
        ResultsComponent,
        MatchesComponent,
        BetComponent,
        UsersComponent,
        AdminListMatchesComponent,
        AdminMatchComponent,
        AdminListTeamsComponent,
        AdminTeamComponent,
        UserComponent
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
