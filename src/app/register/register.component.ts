import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmitUpdateUserService } from '../services/emit-update-user.service';
import { Router } from '@angular/router';

class registerUser {
  name: string
  email: string
  password: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  public user = new registerUser;
  public message = '';

  constructor(
    private auth: AuthService,
    private emitter: EmitUpdateUserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.message = '';
    this.auth.onRegister(this.user).subscribe(res => {
      console.log(res);
      this.message = 'Create Account success, Redirect to Home Page...!';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
      const token: string = res['access_token'];
      // If we have a token, proceed
      if (token) {
        this.auth.setToken(token);
        this.emitter.doUpdateUser();
      }

    }, error => {
      let errorString = JSON.stringify(error.error)
      this.message = errorString;
    })
  }



}
