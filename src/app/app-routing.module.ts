import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QAndAComponent } from './pages/q-and-a/q-and-a.component';
import { TestPackagesComponent } from './pages/test-packages/test-packages.component';
import { TestSubjectsComponent } from './pages/test-subjects/test-subjects.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'test-subjects', component: TestSubjectsComponent },
  { path: 'test-subjects/:id', component: TestPackagesComponent },
  { path: 'q-and-a', component: QAndAComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
