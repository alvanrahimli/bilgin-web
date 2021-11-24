import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideUserInfoComponent } from './components/side-user-info/side-user-info.component';
import { TopStatusbarComponent } from './components/top-statusbar/top-statusbar.component';
import { LeaderboardBriefComponent } from './components/leaderboard-brief/leaderboard-brief.component';
import { StatsBriefComponent } from './components/stats-brief/stats-brief.component';
import { TestSubjectsComponent } from './pages/test-subjects/test-subjects.component';
import { TestPackagesComponent } from './pages/test-packages/test-packages.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QAndAComponent } from './pages/q-and-a/q-and-a.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    TopBarComponent,
    SideUserInfoComponent,
    TopStatusbarComponent,
    LeaderboardBriefComponent,
    StatsBriefComponent,
    TestSubjectsComponent,
    TestPackagesComponent,
    HomePageComponent,
    QAndAComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
