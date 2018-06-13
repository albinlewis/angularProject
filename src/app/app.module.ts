import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatIconModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { AnalyseComponent } from './pages/analyse/analyse.component';
import { PlantsComponent } from './pages/plants/plants.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlantdetailsComponent } from './pages/plantdetails/plantdetails.component';
import { ResultComponent } from './pages/result/result.component';
import { DiseaseComponent } from './pages/disease/disease.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';

import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './pipes/sort.pipe';
import { AuthService } from './services/auth.service';
import { AuthguardService} from './services/authguard.service';
import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { DiseaseListComponent } from './pages/disease-list/disease-list.component';
import { AnalysisService } from './services/analysis.service';
import { GardernerComponent } from './pages/garderner/garderner.component';
import { MapComponent } from './pages/garderner/map/map.component';
import { ListmapComponent } from './pages/garderner/listmap/listmap.component';
import {MapService} from './services/map.service';
import { EmailComponent } from './components/email/email.component';
import { GardenerService } from './services/gardener.service';
import { StringifyPipe } from './pipes/stringify.pipe';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';


export function HttpLoaderFactory(http: HttpClient){
    return new TranslateHttpLoader(http);
}



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EmailComponent,
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
        StringifyPipe,
        LanguageSwitchComponent,

    ],
    imports: [

        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
         apiKey: 'AIzaSyDz276iYbdh-7iQuF7PFUadZa56J0--IYg'
        }),
        
        MatTabsModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        CdkTableModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    ],
    providers: [AnalysisService, ApiService, AuthService, AuthguardService, UserService, GardenerService, MapService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
