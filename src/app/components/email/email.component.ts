import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { IEmail } from '../../model/IEmail';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  providers: [EmailService]
})
export class EmailComponent implements OnInit {

  @Input() receivers: {email: string, name: string}[];
  @Input() content: any;

  emailForm: FormGroup;
  sent: boolean = false;
  error: boolean = false;
  load: boolean = false;

  @ViewChild('open') openButton: ElementRef;

  constructor(private emailService: EmailService,
          private userService: UserService) { }

  ngOnInit() {
    let user = this.userService.getUser();
    this.emailForm = new FormGroup(
      {
        'email_receiver': new FormControl(null, [Validators.email, Validators.required]),
        'email_sender': new FormControl(user.email, [Validators.required, Validators.email, Validators.minLength(8)]),
        'email_message': new FormControl(null, [Validators.required])
      }
    );
  }

  // Send email
  send(){

    if(this.emailForm.valid){
      let email: IEmail = {
        sender: this.emailForm.get('email_sender').value,
        receiver: this.emailForm.get('email_receiver').value,
        subject: "Krankheitsanalyse von " + this.emailForm.get('email_sender').value,
        message: this.emailForm.get('email_message').value + "\n\n",
        content: this.content
      };
      this.load = true;
      this.emailService.sendEmail(email)
        .then(x => {
          this.sent = true
          this.load = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
          this.load = false;
        });
    }
  }

  // Opens modal dialog
  open(){
    this.openButton.nativeElement.click();
  }
}
