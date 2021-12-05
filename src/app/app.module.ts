import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { TestPackageComponent } from './components/test-package/test-package.component';
import { TestSubjectComponent } from './components/test-subject/test-subject.component';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { SingleTestPackageComponent } from './pages/single-test-package/single-test-package.component';
import { TestAnswerComponent } from './components/test-answer/test-answer.component';
import { TestChoicesComponent } from './components/test-choices/test-choices.component';
import { TestOpenEndedComponent } from './components/test-open-ended/test-open-ended.component';
import { AppBaseComponent } from './pages/app-base/app-base.component';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { AccountComponent } from './pages/account/account/account.component';
import { LoginFormComponent } from './components/account/login-form/login-form.component';
import { AccountDetailsComponent } from './pages/account/account-details/account-details.component';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from './pages/account/otp/otp.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { TestPackResultComponent } from './pages/test-pack-result/test-pack-result.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

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
    TestPackageComponent,
    TestSubjectComponent,
    DiscussionsComponent,
    SingleTestPackageComponent,
    TestAnswerComponent,
    TestChoicesComponent,
    TestOpenEndedComponent,
    AppBaseComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    LoginFormComponent,
    AccountDetailsComponent,
    OtpComponent,
    TestPackResultComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
