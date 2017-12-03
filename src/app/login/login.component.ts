import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {Config} from '../_models/config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  private model: any = {};
  private loading = false;
  private errorMessage: string;
  private submitting: boolean;
  private sigInForm: FormGroup;
  private hidepassword: Boolean = true;
  private redirectUrl = environment.loginsuccess;

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
    this.sigInForm = this.fb.group({
      'nameFormControl': ['', Validators.required],
      'passwordFormControl': ['', [
        Validators.required,
        Validators.minLength(6)]
      ]
    }, {updateOn: 'blur'});
  }

  login() {
    this.loading = true;
    const userData = {
      'username': this.sigInForm.value.nameFormControl,
      'password': this.sigInForm.value.passwordFormControl
    };
    this.authenticationService.login(userData)
      .subscribe(result => {
          this._handleSubmitSuccess();
        }, (e)  =>  {
          // login failed
          this.sigInForm.patchValue({'passwordFormControl': ''});
          this._handleSubmitError(e);
        });
  }

  private _handleSubmitSuccess() {
    this.submitting = false;
    // Redirect to event detail
    console.log(this.sigInForm);
    this.router.navigate([this.redirectUrl]);
  }

  private _handleSubmitError(autherror) {
    this.sigInForm.get('nameFormControl')
      .setErrors({serverError: {incorrectData: autherror}});
    this.sigInForm.get('passwordFormControl')
      .setErrors({serverError: {incorrectData: autherror}});
    this.errorMessage = this.config.errorMessages.authenticated;
    this.submitting = false;
    this.loading = false;
    console.error('server error', autherror);
  }
}
