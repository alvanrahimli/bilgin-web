import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './pages/account/account-details/account-details.component';
import { AccountComponent } from './pages/auth/account/account.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserInfoComponent } from './pages/auth/user-info/user-info.component';
import { AppBaseComponent } from './pages/app-base/app-base.component';
import { ClassDetailsComponent } from './pages/class/class-details/class-details.component';
import { ClassManagementComponent } from './pages/class/class-management/class-management.component';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SingleTestPackIntroComponent } from './pages/testing/single-test-pack-intro/single-test-pack-intro.component';
import { SingleTestPackageComponent } from './pages/testing/single-test-package/single-test-package.component';
import { TestPackResultComponent } from './pages/testing/test-pack-result/test-pack-result.component';
import { TestPackagesComponent } from './pages/testing/test-packages/test-packages.component';
import { TestSubjectsComponent } from './pages/testing/test-subjects/test-subjects.component';
import { AuthGuard } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: AppBaseComponent, children: [
    { path: '', component: HomePageComponent },
    { path: 'subjects', component: TestSubjectsComponent, pathMatch: 'full' },
    { path: 'subjects/:sId', component: TestPackagesComponent },
    { path: 'subjects/:sId/packages/:pId/tests', component: SingleTestPackageComponent, canActivate: [AuthGuard] },
    { path: 'subjects/:sId/packages/:pId/intro', component: SingleTestPackIntroComponent, canActivate: [AuthGuard] },
    { path: 'subjects/:sId/packages/:pId/completion', component: TestPackResultComponent, canActivate: [AuthGuard] },
    {
      path: 'class-management', canActivate: [AuthGuard], children: [
        {path: '', component: ClassDetailsComponent}
      ]
    },
    {
      path: 'account', canActivate: [AuthGuard], children: [
        { path: '', component: AccountDetailsComponent },
      ]
    },
    { path: 'discussions', component: DiscussionsComponent },
  ]},
  { path: 'auth', component: AccountComponent, children: [
    { path: 'login', children: [
      { path: '', component: LoginComponent },
      { path: 'otp', component: OtpComponent }
    ] },
    { path: 'register', children: [
      { path: '', component: RegisterComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'user-info', component: UserInfoComponent }
    ] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
