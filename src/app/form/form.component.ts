import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  countries: any[] = [{ text: 'Loading...', value: 'Loading...' }];

  occupations = [
    { text: 'Frontend Developer', value: 'Frontend Developer' },
    { text: 'Backend Developer', value: 'Backend Developer' },
    { text: 'Designer', value: 'Designer' },
    { text: 'Devops Engineer', value: 'Devops Engineer' },
  ];

  countriesApiObservable!: Subscription;

  registrationForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
    ]),
    country: new FormControl('', Validators.required),
    occupation: new FormControl('', Validators.required),
    successful: new FormControl(null, Validators.required),
  });

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get country() {
    return this.registrationForm.get('country');
  }

  get occupation() {
    return this.registrationForm.get('occupation');
  }

  get successful() {
    return this.registrationForm.get('successful');
  }

  constructor(
    private apiService: ApiService,
    private notification: NotificationService,
    private router: Router
  ) {}

  submitForm() {
    if (!this.registrationForm.value.successful) {
      this.notification.btnClicked("Successful must be true to continue", "error");
    } else {
      this.notification.btnClicked(
        'Your registration is successful!',
        'success'
      );
      this.router.navigate(['/success']);
    }
  }

  ngOnInit() {
    // API call to fetch countries
    this.countriesApiObservable = this.apiService
      .getCountries()
      .subscribe((data: any[]) => {
        this.countries = [];
        for (let country in data) {
          let countryObj = {
            text: data[country],
            value: data[country],
          };

          this.countries.push(countryObj);
        }
      });
  }

  ngOnDestroy() {
    this.countriesApiObservable.unsubscribe();
  }
}
