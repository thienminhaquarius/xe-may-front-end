import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit, AfterViewInit {
  @Input() ratingModel;
  public ratingPoint: number = 0;
  public activeRating: boolean = false;
  public isDisabledBtn: boolean = true;

  private httpOptions: any;

  public message = '';

  constructor(
    private auth: AuthService,
    private products: ProductsService

  ) {
  }

  ngOnInit() {
    console.log(this.ratingModel);
    if (this.ratingModel) {
      //whether user has been rating this product!
      if (this.ratingModel.value) {
        this.ratingPoint = this.ratingModel.value
      }

      this.activeRating = true;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.auth.getToken()
        })
      }
    } else {
      this.httpOptions = null;
      this.activeRating = false;
    }
  }

  ngAfterViewInit() {
    
  }

  onClickRatingChange(e: any) {
    this.ratingPoint = e.rating;

    //Submit button status
    if (!this.ratingModel) {
      this.isDisabledBtn = false;
    } else if (this.ratingModel.value != e.rating) {
      this.isDisabledBtn = false;
    } else {
      this.isDisabledBtn = true;
    }
  }

  createOrUpdateRating() {
    this.isDisabledBtn = true;
    this.message = '';

    this.ratingModel.value = this.ratingPoint;

    this.products.createOrUpdateRating(this.ratingModel, this.httpOptions).subscribe(
      res => {
        console.log(res);
        this.message = 'Rating Success!';
        this.ratingModel = res;
        this.ratingPoint = this.ratingModel.value;
      },
      errors => {
        console.log(errors);
        this.message = 'Rating fail!, try later';
      }
    );

  }


}
