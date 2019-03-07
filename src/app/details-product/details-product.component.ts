import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, ProductInterface } from '../services/products.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';



import { environment } from '../../environments/environment';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  public bike: any;
  public readonly assetsUrl = environment.assetsThumbnailUrl;
  public readonly defaultImg = environment.url + 'default.jpg';
  public imageSrc: String;
  public userHasRatingThis: any = null;
  public activeRatingComponent: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private auth: AuthService
  ) {
    this.imageSrc = this.defaultImg;

    this.activatedRoute.params.subscribe(params => {
      let httpOptions
      if (this.auth.isValidatedToken()) {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.auth.getToken()
          })
        }
      }

      this.productsService.getDetailBike(params.id, httpOptions).subscribe(bike => {
        this.bike = bike;
        console.log(this.bike);
        this.imageSrc = this.assetsUrl + this.bike.thumbnailImage;

        //whether User has ratated this bike in the past        
        if (this.bike.userHasRatingThis) {
          this.userHasRatingThis = this.bike.userHasRatingThis;
        }
        //User login but has never rated this bike
        else if (this.auth.isAuhtenticated() && !this.userHasRatingThis) {
          this.userHasRatingThis = {};
          this.userHasRatingThis.bike_id = this.bike.id;
          this.userHasRatingThis.user_id = this.auth.getUserInfo()['sub'];
          this.userHasRatingThis.value = null;
        }
        //user no login
        else {
          this.userHasRatingThis = null;
        }

        this.activeRatingComponent = true;
      }, error => {
        this.router.navigate(['/not-found']);
      });
    },
      errors => {
        this.router.navigate(['/not-found']);
      }
    );
  }

  ngOnInit() {

  }

}
