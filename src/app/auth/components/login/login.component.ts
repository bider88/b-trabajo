import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CredentialClass } from 'src/app/models/credential.class';
import { UserClass } from 'src/app/models/user.class';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() isRecruiter = false;

  loginForm: FormGroup;
  loading = false;
  messageError = '';
  urlSignUp = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, Validators.required]
    });

    this.urlSignUp = this.isRecruiter ? '/auth/signup-recruiter' : '/auth/signup';
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      const credentials = new CredentialClass(email, password);

      this.sendCredentials(credentials);
    }
  }

  sendCredentials(credentials: CredentialClass) {
    this.authService.emailLogin(credentials).subscribe(
      res => {
        const { firstName, lastName, createdAt, email, img, role, _id } = res.data;
        const token = res.token;
        const user = new UserClass(firstName, lastName, createdAt, email, '', img, role, _id );
        this.authService.loginToken(user, token);
      },
      err => {
        if (err.error.err.message === 'Email or password are invalid') {
          this.clickIzi();
        }
      },
      () => this.loading = false
    );
  }

  clickIzi() {
    iziToast.error({
      position: 'bottomCenter',
      message: 'El correo y/o la contraseña son incorrectos'
    });
  }

}
