import { Component, OnInit } from '@angular/core';
import { ResetDataService } from '../services/reset-data.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public isDisabledResetBtn: boolean = false;
  public message = '';

  constructor(
    private reset: ResetDataService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  btnReset() {
    this.isDisabledResetBtn = true;
    this.message = '';
    this.router.navigate(['/']);
    setTimeout(() => {
      this.resetDatabase();
    }, 200);
  }

  resetDatabase() {
    this.auth.removeToken();
    this.reset.database().subscribe(
      res => {
        // this.isDisabledResetBtn = false;
        location.reload();
      },
      errors => {
        this.isDisabledResetBtn = false;
        this.message = 'Reset database errors, try again later';
        location.reload();
      }
    );
  }

}
