import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IDisease } from '../model/IDisease';
import { DiseaseService } from '../services/disease.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css'],
  providers: [DiseaseService]
})
export class DiseaseComponent implements OnInit, OnDestroy {
  disease: IDisease;
  sub: Subscription;

  constructor(private dService: DiseaseService, private route: ActivatedRoute) {}

  ngOnInit() {
      this.sub = this.route.params.subscribe((params: Params) => {
          let id = params['id'];
          this.getPlant(id);
      });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  getPlant(id) {
      this.dService.getSingleDisease(id)
          .then(disease => this.disease = disease)
          .catch(err => console.log(err));
  }
}
