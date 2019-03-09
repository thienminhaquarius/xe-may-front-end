import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { EmitRemoveProductService } from '../services/emit-remove-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public listIdBikes = [];
  public listBikeTopRatings = [];
  public listBikeTopComments = [];

  public disableLoading: Boolean = false;
  public showMoreBtn: Boolean = true;

  constructor(
    private prods: ProductsService,
    private router: Router,
    private emitRemoveProduct: EmitRemoveProductService
  ) {
    this.emitRemoveProduct.updateDashboard.subscribe((id) => {
      console.log(id);
      for (let i = 0; i < this.listIdBikes.length; i++) {
        if (this.listIdBikes[i].id == id) {
          this.listIdBikes.splice(i, 1);
          return;
        }
      }
    });
  }

  ngOnInit() {
    //Load newest bikes
    this.getMore();

    //Load top raitng bikes
    this.getTopRatingBikes();

    //Load top comment bikes
    this.getTopCommentBikes();

  }

  isShowMoreBtn(moreProductLength) {
    if (moreProductLength && moreProductLength.length > 0) {
      return true;
    }
    else
      return false;
  }

  getMore() {

    this.disableLoading = false;
    let skip = this.listIdBikes.length;
    this.prods.loadListbikeId(skip).subscribe((listIdBikes: any) => {
      console.log(listIdBikes);
      this.disableLoading = true;
      this.showMoreBtn = this.isShowMoreBtn(listIdBikes);

      this.listIdBikes = [...this.listIdBikes, ...listIdBikes];
    }, error => {
      console.log(error);
      this.router.navigate(['/not-found']);
    });
  }

  getTopRatingBikes() {
    let skip = 0, take = 8, order = 'rating';

    this.prods.loadListbikeId(skip, take, order).subscribe((listBikeTopRatings: any) => {

      this.listBikeTopRatings = listBikeTopRatings;
    }, error => {
      console.log(error);
      // this.router.navigate(['/not-found']);
    });
  }

  getTopCommentBikes() {
    let skip = 0, take = 8, order = 'comment';
    this.prods.loadListbikeId(skip, take, order).subscribe((listBikeTopComments: any) => {

      this.listBikeTopComments = listBikeTopComments;
    }, error => {
      console.log(error);
      // this.router.navigate(['/not-found']);
    });
  }


}
