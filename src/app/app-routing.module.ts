import { SymptomsAndPrecautionsComponent } from './symptoms-and-precautions/symptoms-and-precautions.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'countries',component:CountriesComponent},
  {path:'symptoms-and-precautions',component:SymptomsAndPrecautionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
