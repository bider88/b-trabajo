import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserClass } from 'src/app/models/user.class';
import iziToast from 'izitoast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() isRecruiter = false;

  signupForm: FormGroup;
  loading = false;
  urlLogin = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.email, Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.urlLogin = this.isRecruiter ? '/login-recruiter' : '/login';
  }

  signUp() {
    if (this.signupForm.valid) {
      this.loading = true;

      const role = this.isRecruiter ? 'RECRUITER_ROLE' : 'USER_ROLE';

      const { firstName, lastName, email, password } = this.signupForm.value;
      const user = new UserClass(firstName, lastName, new Date(), email, password, '', role );

      this.sendUser(user);
    }
  }

  sendUser(user: UserClass) {
    this.authService.emailSignUp(user).subscribe(
      res => {
        const { firstName, lastName, createdAt, email, img, role, _id } = res.data;
        const token = res.token;
        const newUser = new UserClass(firstName, lastName, createdAt, email, null, img, role, _id);
        this.authService.loginToken(newUser, token);
      },
      err => {
        if (err.error.err.errors.email.message === 'email must be unique') {
          this.clickIzi();
        }
        console.log(err);
      },
      () => this.loading = false
    );
  }

  clickIzi() {
    iziToast.info({
      position: 'bottomCenter',
      title: 'Email registrado',
      message: 'El correo electrónico ya ha sido registrado'
    });
  }

  showErrorsFirstName() {
    return this.signupForm.controls['firstName'].errors && this.signupForm.controls['firstName'].touched;
  }

  showErrorsLastName() {
    return this.signupForm.controls['lastName'].errors && this.signupForm.controls['lastName'].touched;
  }

  showErrorsEmail() {
    return this.signupForm.controls['email'].errors && this.signupForm.controls['email'].touched;
  }

  showErrorsPassword() {
    return this.signupForm.controls['password'].errors && this.signupForm.controls['password'].touched;
  }

}
