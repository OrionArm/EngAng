import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {Config} from '../../_models/config';
import {UserAuthRequest} from '../../_models/user';

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
  public errorMessage: string;
  public submitting: boolean;
  public username;
  public password;
  public signUpForm: FormGroup;
  public hidepassword: Boolean = true;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private config: Config) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.signUpForm = this.fb.group({
      'nameFormControl': ['', Validators.required, ],
      'emailFormControl': ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]
      ],
      'addressFormControl': ['', ],
      'passwordFormControl': ['', [ Validators.required, Validators.minLength(6)]],
      'passwordFormControl2': ['', [ Validators.required, Validators.minLength(6)]]

    }, {updateOn: 'blur'});
  }

  registration(): void {
    const userData = new UserAuthRequest( {
      'username': this.signUpForm.value.nameFormControl,
      'email': this.signUpForm.value.emailFormControl,
      'address': this.signUpForm.value.addressFormControl,
      'password': this.signUpForm.value.passwordFormControl,
      'confirm_password': this.signUpForm.value.passwordFormControl2,
    });

    this.loading = true;
    this.authenticationService.registration(userData)
      .subscribe(regSuccess => {
          this._handleSubmitSuccess(regSuccess);
        },  regError => {
          this._handleSubmitError(regError);
        });
  }

  private _passwordConfirming(field: AbstractControl): { invalid: boolean } {
    if (field.get('password').value !== field.get('confirm_password').value) {
      return {invalid: true};
    }
  }

  private _handleSubmitSuccess(regSuccess) {
    console.log('Registration successfully', regSuccess);
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    this.router.navigate(['/signin']);
  }

  private _handleSubmitError(regError) {
    Object.keys(this.signUpForm.controls).forEach(field => {
      this.signUpForm.get(field).setErrors({incorrectData: regError});
    });
    this.errorMessage = this.config.errorMessages.register;
    console.error('Registration failed: ', regError);
    this.submitting = false;
    this.error = true;
    this.loading = false;
  }

}
