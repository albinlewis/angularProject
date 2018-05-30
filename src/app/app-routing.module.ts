import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { PlantsComponent } from './plants/plants.component';
import { ProfileComponent } from './profile/profile.component';
import { PlantdetailsComponent } from './plantdetails/plantdetails.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import { DiseaseComponent } from './disease/disease.component';
import { AnalyseComponent } from './analyse/analyse.component';
import {AuthguardService} from "./services/authguard.service";
import { DiseaseListComponent } from './disease-list/disease-list.component';

const appRoutes: Routes = [
  {path: '', component: PlantsComponent},
  {path: 'analyse', component: AnalyseComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthguardService]},
  {path: 'details/:id', component: PlantdetailsComponent},
  {path: 'result/:id', component: ResultComponent},
  {path: 'diseases', component: DiseaseListComponent},
  {path: 'disease/:id', component: DiseaseComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
