import { Component, OnInit } from '@angular/core';
import { EmitUpdateUserService } from '../services/emit-update-user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuhtenticated: boolean = false;
  public user: any;

  constructor(
    private emitter: EmitUpdateUserService,
    private auth: AuthService
  ) {

    this.emitter.updateUser.subscribe(() => {
      this.isAuhtenticated = this.auth.isAuhtenticated()
      if (this.isAuhtenticated) {
        this.user = this.auth.getUserInfo();
      } else {
        this.user = '';
      }
    })
  }

  ngOnInit() {
    this.isAuhtenticated = this.auth.isAuhtenticated()
    if (this.isAuhtenticated) {
      this.user = this.auth.getUserInfo();
    }
  }



}
