import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Config} from '../../_models/config';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  hidepassword: Boolean = true;
  errorMessage: string;
  private submitting: boolean;
  private loading = false;
  private redirectUrl = environment.loginSuccess;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private config: Config) {
    this.createForm();
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  createForm() {
    this.signinForm = this.fb.group({
      'emailFormControl': ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]
      ],
      'passwordFormControl': ['', [
        Validators.required,
        Validators.minLength(6)]
      ]
    }, {updateOn: 'blur'});
  }

  login() {
    const userData = {
      'email': this.signinForm.value.emailFormControl,
      'password': this.signinForm.value.passwordFormControl
    };
    this.loading = true;
    this.authenticationService.login(userData)
      .subscribe(result => {
          this._handleSubmitSuccess();
        }, (e)  =>  {
          // login failed
          this._handleSubmitError(e);
        });
  }

  userInfo() {

  }

  private _handleSubmitSuccess() {
    this.submitting = false;
    // Redirect to event detail
    console.log(this.signinForm);
    this.router.navigate([this.redirectUrl]);
  }

  private _handleSubmitError(autherror) {
    this.signinForm.get('passwordFormControl').setErrors({incorrectData: autherror});
    this.signinForm.patchValue({'passwordFormControl': ''});
    this.errorMessage = this.config.errorMessages.authenticated;
    this.submitting = false;
    this.loading = false;
    console.error('server error', autherror);
  }
}
