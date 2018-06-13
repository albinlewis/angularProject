import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { IPlant } from '../../model/IPlant';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AnalysisService } from '../../services/analysis.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-analyse',
    templateUrl: './analyse.component.html',
    styleUrls: ['./analyse.component.css'],
    providers: [PlantService]
})
export class AnalyseComponent implements OnInit {
    url = '';
    showImage = false;
    notification_email: string = "";
    plants: IPlant[] = [];

    @ViewChild(NgForm) analysisForm:NgForm;
    @ViewChild('image') image;
    @ViewChild('loader') loader;

    constructor(private pService: PlantService, 
        private aService: AnalysisService,
        public userService: UserService,
        private router: Router) {

    }

    ngOnInit() {
        if(this.userService.getUser()) this.notification_email = this.userService.getUser().email;
        this.stopAnalysis();
        this.getPlants();
    }

    getPlants(){
        this.pService.getAllPlants().then(plants => this.plants = plants);
    }


    startAnalysis(){this.loader.nativeElement.style.display = 'flex';}
    stopAnalysis(){this.loader.nativeElement.style.display = 'none';}

    onSubmit(){
        let element = this.image.nativeElement;
        if(element.files && element.files[0]){
            this.startAnalysis();
            const formData = new FormData();
            formData.append('image_file', element.files[0]);
            formData.append('crop_id', this.analysisForm.value.crop_id);
            formData.append('notification_email', this.notification_email);
            this.aService.startAnalysis(formData)
                .then(res => {
                    this.stopAnalysis();
                    this.router.navigate(["result", res.data]);
                })
                .catch(err => {
                    this.stopAnalysis();
                    console.error(err);
                });
        }
    }

    onSelectFile(event) {

        this.showImage = true;
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (filevent: any) => { // called once readAsDataURL is completed
               this.url = filevent.target.result;
            };
        }
    }

}
