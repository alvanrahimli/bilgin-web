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
import { TestSubjectsComponent } from './pages/testing/test-subjects/test-subjects.component';
import { TestPackagesComponent } from './pages/testing/test-packages/test-packages.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestPackageComponent } from './components/test-package/test-package.component';
import { TestSubjectComponent } from './components/test-subject/test-subject.component';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { SingleTestPackageComponent } from './pages/testing/single-test-package/single-test-package.component';
import { TestAnswerComponent } from './components/test-answer/test-answer.component';
import { TestChoicesComponent } from './components/test-choices/test-choices.component';
import { TestOpenEndedComponent } from './components/test-open-ended/test-open-ended.component';
import { AppBaseComponent } from './pages/app-base/app-base.component';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { AccountComponent } from './pages/account/account/account.component';
import { AccountDetailsComponent } from './pages/account/account-details/account-details.component';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from './pages/account/otp/otp.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { TestPackResultComponent } from './pages/testing/test-pack-result/test-pack-result.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { StatusIndicatorComponent } from './components/status-indicator/status-indicator.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { SingleTestPackIntroComponent } from './pages/testing/single-test-pack-intro/single-test-pack-intro.component';
import { BilginFooterComponent } from './components/bilgin-footer/bilgin-footer.component';
import { ClassManagementComponent } from './pages/class/class-management/class-management.component';
import { UserInfoComponent } from './pages/account/user-info/user-info.component';
import { HomepageStatusComponent } from './components/home-page/homepage-status/homepage-status.component';
import { HomepageCardComponent } from './components/home-page/homepage-card/homepage-card.component';
import { ClassDetailsComponent } from './pages/class/class-details/class-details.component';

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
    AccountDetailsComponent,
    OtpComponent,
    TestPackResultComponent,
    BackButtonComponent,
    StatusIndicatorComponent,
    PageTitleComponent,
    SingleTestPackIntroComponent,
    BilginFooterComponent,
    ClassManagementComponent,
    UserInfoComponent,
    HomepageStatusComponent,
    HomepageCardComponent,
    ClassDetailsComponent,
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
