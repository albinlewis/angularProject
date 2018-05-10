import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
    MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule, MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule, MatStepperModule,
    MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';

import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

import {CdkTableModule} from '@angular/cdk/table';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AnalyseComponent } from './analyse/analyse.component';
import {RouterModule, Routes} from '@angular/router';
import {PlantsComponent} from './plants/plants.component';
import { SalesComponent } from './sales/sales.component';
import { ProfileComponent } from './profile/profile.component';
import { PlantdetailsComponent } from './plantdetails/plantdetails.component';

const appRoutes: Routes = [
    {path: '', component: PlantsComponent},
    {path: 'analyse', component: AnalyseComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'sales', component: SalesComponent},
    {path: 'details', component: PlantdetailsComponent},

];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AnalyseComponent,
        PlantsComponent,
        SalesComponent,
        ProfileComponent,
        PlantdetailsComponent,

    ],
    imports: [

        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        MatTabsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatExpansionModule,
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,

        MatIconModule,
        MatGridListModule,

        MatNativeDateModule,
        ReactiveFormsModule,


    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
