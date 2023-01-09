import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';
import { ExibitionFormComponent } from './exibitions/exibition-form/exibition-form.component';
import { ExibitionsComponent } from './exibitions/exibitions.component';
import { InfoComponent } from './exibitions/info/info.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "exibitions", component: ExibitionsComponent },
  { path: "exibitions/add", component: ExibitionFormComponent },
  { path: 'exibitions/:id', component: InfoComponent},
  { path: "about", component: AboutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }