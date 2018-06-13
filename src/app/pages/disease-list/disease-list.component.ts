import { Component, OnInit } from '@angular/core';
import { IDisease } from '../../model/IDisease';
import { Router } from '@angular/router';
import { DiseaseService } from '../../services/disease.service';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.css'],
  providers: [DiseaseService]
})
export class DiseaseListComponent implements OnInit {

  filterValue = '';
  diseases: IDisease[] = [];

  constructor(private route: Router, private diseaseService: DiseaseService) {
      
  }

  ngOnInit() {
      this.getDiseases();
  }

  getDiseases(){
      this.diseaseService.getAllDiseases()
          .then(diseases => this.diseases = diseases);
  }

  onShowDetails(disease: IDisease) {
      this.route.navigate(['/disease', disease._id]);
  }


}
