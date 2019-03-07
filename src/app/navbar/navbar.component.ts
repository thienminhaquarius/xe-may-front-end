import { Component, OnInit } from '@angular/core';
import { EmitUpdateUserService } from '../services/emit-update-user.service';
import { AuthService } from '../services/auth.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuhtenticated: boolean = false;
  public user: any;

  public defaultImg: any;
  public readonly defaultImgSrc = environment.url + 'default.jpg';

  constructor(
    private emitter: EmitUpdateUserService,
    private auth: AuthService
  ) {
    this.loadDefaultImg();

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

  loadDefaultImg() {
    this.defaultImg = document.createElement('img');
    this.defaultImg.src = this.defaultImgSrc;
  }

}
