import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})
export class LanguageSwitchComponent implements OnInit {

  languages: string[] = ["en", "de"]
  current: string;
  
  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.current = this.languages[0];
  }

  change(){
    this.translateService.use(this.current);
  }

}
