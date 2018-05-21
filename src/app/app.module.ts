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
import { ProfileComponent } from './profile/profile.component';
import { PlantdetailsComponent } from './plantdetails/plantdetails.component';
import { ResultComponent } from './result/result.component';
import { DiseaseComponent } from './disease/disease.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { ShortenPipe } from './Pipes/shorten.pipe';
import {BrowseService} from './services/browse.service';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './Pipes/sort.pipe';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AnalyseComponent,
        PlantsComponent,
        ProfileComponent,
        PlantdetailsComponent,
        ResultComponent,
        DiseaseComponent,
        FilterPipe,
        ShortenPipe,
        RegisterComponent,
        LoginComponent,
        NotFoundComponent,
        SortPipe,

    ],
    imports: [

        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

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
    providers: [BrowseService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
