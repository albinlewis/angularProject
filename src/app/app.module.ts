import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {
  MatCardModule,
  MatExpansionModule,
  MatTabsModule
} from '@angular/material';
import {TabnavComponent} from './tabnav/tabnav.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { PlantComponent } from './tabnav/plant/plant.component';
import { AnalysisComponent } from './tabnav/analysis/analysis.component';
import { SaleComponent } from './tabnav/sale/sale.component';
import {ProfileComponent} from "./tabnav/profile/profile.component";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabnavComponent,
    PlantComponent,
    AnalysisComponent,
    SaleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatCardModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
