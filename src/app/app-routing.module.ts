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

const appRoutes: Routes = [
  {path: '', component: PlantsComponent},
  {path: 'analyse', component: AnalyseComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'details/:id', component: PlantdetailsComponent},
  {path: 'results', component: ResultComponent},
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
