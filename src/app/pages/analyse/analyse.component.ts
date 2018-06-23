import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { IPlant } from '../../model/IPlant';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AnalysisService } from '../../services/analysis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-analyse',
    templateUrl: './analyse.component.html',
    styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
    url = '';
    showImage = false;
    push: boolean = false;
    load: boolean = false;
    errorMessage: string;

    notification_email: string = "";
    plants: IPlant[] = [];

    selected: number;

    @ViewChild(NgForm) analysisForm: NgForm;
    @ViewChild('image') image;

    constructor(private pService: PlantService,
        private aService: AnalysisService,
        public userService: UserService,
        private notificationService: NotificationService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        if (this.userService.getUser()) this.notification_email = this.userService.getUser().email;
        this.getPlants();
    }

    getPlants() {
        this.pService.getAllPlants().then(plants => {
            this.plants = plants;
            this.route.queryParams.subscribe(params => {
                let preselect = params["plant"];
                if (preselect) this.selected = +preselect;
                else this.selected = plants[0]._id;
            })
        });
    }

    onSubmit() {
        let element = this.image.nativeElement;
        if (this.selected && element.files && element.files[0]) {
            const formData = new FormData();
            formData.append('image_file', element.files[0]);
            formData.append('crop_id', this.selected.toString());
            formData.append('notification_email', this.notification_email);
            if (this.notificationService.subscription)
                formData.append('subscription', JSON.stringify(this.notificationService.subscription));

            this.load = true;
            this.errorMessage = null;

            this.aService.startAnalysis(formData)
                .then(res => {
                    if (res.method === 'poll') {
                        this.router.navigate(["result", res.data]);
                    } else {
                        this.push = true;
                    }
                    this.load = false;
                })
                .catch(err => {
                    if (err.status === 504 || !err.status) {
                        this.errorMessage = "ERRORS.NO_CONNECTION";
                    } else if (err.error) {
                        this.errorMessage = err.error.error.message;
                    } else {
                        this.errorMessage = "ANALYSIS.NO_RESULT";
                    }
                    console.error(err);
                    this.load = false;
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
