import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SingleTestPackageComponent } from './pages/single-test-package/single-test-package.component';
import { TestPackagesComponent } from './pages/test-packages/test-packages.component';
import { TestSubjectsComponent } from './pages/test-subjects/test-subjects.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'subjects', component: TestSubjectsComponent, pathMatch: 'full' },
  { path: 'subjects/:sId', component: TestPackagesComponent },
  { path: 'subjects/:sId/packages/:pId', component: SingleTestPackageComponent },
  { path: 'discussions', component: DiscussionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
