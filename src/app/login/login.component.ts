import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  private model: any = {};
  private loading = false;
  public username;
  public password;
  public sigInForm: FormGroup;
  private hidepassword: Boolean = true;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  createForm() {
    this.sigInForm = this.fb.group({
      'emailFormControl': [ '', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]
      ],
      'passwordFormControl': ['', [
        Validators.required,
        Validators.minLength(6)]
      ]
    }, { updateOn: 'blur' });
  }
  login(e) {
    this.loading = true;
    /*this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });*/

    console.log(this.sigInForm);
  }
}
