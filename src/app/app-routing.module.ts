import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './pages/account/account-details/account-details.component';
import { AccountComponent } from './pages/account/account/account.component';
import { LoginComponent } from './pages/account/login/login.component';
import { OtpComponent } from './pages/account/otp/otp.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { AppBaseComponent } from './pages/app-base/app-base.component';
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
        {path: '', component: ClassManagementComponent}
      ]
    },
    { path: 'discussions', component: DiscussionsComponent },
  ]},
  { path: 'account', component: AccountComponent, children: [
    { path: '', component: AccountDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', children: [
      { path: '', component: LoginComponent },
      { path: 'otp', component: OtpComponent }
    ] },
    { path: 'register', component: RegisterComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
