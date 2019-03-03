import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router"
import { EmitUpdateUserService } from '../services/emit-update-user.service';

class loginUser {
  email: string
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new loginUser;
  public message = '';
  private returnUrl = '/';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private emitter: EmitUpdateUserService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.returnUrl = params['return'] || '/';

    });
  }

  login() {
    this.message = '';
    this.auth.onLogin(this.user).subscribe(
      res => {
        console.log(res);
        this.message = 'Log In Success, Redirect to Home Page...!';
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 2000);
        const token: string = res['access_token'];

        // If we have a token, proceed
        if (token) {
          this.auth.setToken(token);
          this.emitter.doUpdateUser();
        }

        let exp = this.auth.getUserInfo()['exp'];
        let clientTime = Math.floor(Date.now() / 1000);

        console.log(console.log(exp - clientTime));


      }, error => {
        this.message = 'Usernmame or Password is incorrect!';
      })
  }

}
