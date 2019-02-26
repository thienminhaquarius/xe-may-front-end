import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router"
import { EmitUpdateUserService } from '../services/emit-update-user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  public message: string = 'Please Wait...'
  constructor(
    private auth: AuthService,
    private router: Router,
    private emitter: EmitUpdateUserService
  ) {

  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getToken()
      })
    }
    this.auth.onLogout(httpOptions).subscribe(res => {
      this.message = 'Log Out Success!, Redirect to Home page...';
      this.auth.removeToken();
      this.emitter.doUpdateUser();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, error => {
      this.message = 'Something wrong!, try logout later'
    })


  }
}
