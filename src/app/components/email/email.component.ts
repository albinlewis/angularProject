import { Component, OnInit, Input } from '@angular/core';
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
  @Input() message: string = "";
  emailForm: FormGroup;
  sent: boolean = false;
  error: boolean = false;

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

  send(){

    if(this.emailForm.valid){
      let email: IEmail = {
        sender: this.emailForm.get('email_sender').value,
        receiver: this.emailForm.get('email_receiver').value,
        subject: "Krankheitsanalyse von " + this.emailForm.get('email_sender').value,
        message: this.emailForm.get('email_message').value + "\n\n" + this.message
      };
      this.emailService.sendEmail(email)
        .then(x => this.sent = true)
        .catch(err => {
          console.log(err);
          this.error = true;
        });
    }
  }
}
