import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  private model: any = {};
  private loading = false;
  public error: boolean;
  public submitting: boolean;
  public username;
  public password;
  public sigUpForm: FormGroup;
  private hidepassword: Boolean = true;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.sigUpForm = this.fb.group({
      'nameFormControl': ['', Validators.required,],
      'emailFormControl': ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]
      ],
      'addressFormControl': ['', ],
      'passwordFormControl': ['', [
        Validators.required,
        Validators.minLength(6)]
      ],
      'password2FormControl': ['', [
        Validators.required,
        Validators.minLength(6)]
      ]
    }, {updateOn: 'blur'});
  }

  registration() {
    this.loading = true;
    console.log('this.sigUpForm', this.sigUpForm.value);
    this.authenticationService.registration(this.sigUpForm.value)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this._handleSubmitSuccess();
        } else {
          // login failed
          this._handleSubmitError('Registration failed');
        }
      });

  }

  private _handleSubmitSuccess() {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    this.router.navigate(['/']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    this.loading = false;
  }
}
