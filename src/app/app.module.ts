import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatIconModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AnalyseComponent } from './analyse/analyse.component';
import { PlantsComponent } from './plants/plants.component';
import { ProfileComponent } from './profile/profile.component';
import { PlantdetailsComponent } from './plantdetails/plantdetails.component';
import { ResultComponent } from './result/result.component';
import { DiseaseComponent } from './disease/disease.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { ShortenPipe } from './Pipes/shorten.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';

import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './Pipes/sort.pipe';
import { AuthService } from './services/auth.service';
import { AuthguardService} from './services/authguard.service';
import { UserService } from './services/user.service';
import { FooterComponent } from './footer/footer.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { AnalysisService } from './services/analysis.service';
import { GardernerComponent } from './garderner/garderner.component';
import {LocationService} from './services/location.service';
import { MapComponent } from './garderner/map/map.component';
import { ListmapComponent } from './garderner/listmap/listmap.component';
import {MapService} from './services/map.service';
import { NotificationsComponent } from './notifications/notifications.component';






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
        SortPipe,
        FooterComponent,
        DiseaseListComponent,
        GardernerComponent,
        MapComponent,
        ListmapComponent,
        NotificationsComponent,

    ],
    imports: [

        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        AgmCoreModule.forRoot({
         apiKey: 'AIzaSyDz276iYbdh-7iQuF7PFUadZa56J0--IYg'
        }),

        FormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        CdkTableModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    ],
    providers: [AnalysisService, ApiService, AuthService, AuthguardService, UserService, LocationService, MapService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
