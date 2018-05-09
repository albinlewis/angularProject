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
import {TabnavComponent} from './tabnav/tabnav.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PlantComponent} from './tabnav/plant/plant.component';
import {AnalysisComponent} from './tabnav/analysis/analysis.component';
import {SaleComponent} from './tabnav/sale/sale.component';
import {ProfileComponent} from './tabnav/profile/profile.component';
import {CdkTableModule} from '@angular/cdk/table';
import {PlantDetailsComponent} from './tabnav/plant/plant-details/plant-details.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TabnavComponent,
        PlantComponent,
        AnalysisComponent,
        SaleComponent,
        ProfileComponent,
        PlantDetailsComponent
    ],
    imports: [

        BrowserModule,
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
