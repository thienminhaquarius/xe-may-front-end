import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, ProductInterface } from '../services/products.service';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  public detailBike: any;
  public readonly assetsUrl = environment.assetsThumbnailUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.productsService.getDetailBike(params.id).subscribe(bike => {
        this.detailBike = bike;
        console.log(this.assetsUrl + this.detailBike.thumbnailImage);
        console.log(this.detailBike);
      }, error => {
        this.router.navigate(['/not-found']);
      });
    },
      errors => {
        this.router.navigate(['/not-found']);
      }
    );
  }

}
