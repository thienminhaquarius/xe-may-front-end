import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductsService, ProductInterface } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Array<ProductInterface>;
  queryString: String;
  disableLoading: Boolean;
  showMoreBtn: Boolean

  constructor(
    private service: ProductsService,
    private router: Router
  ) {
    this.products = [];
    this.queryString = '';
    this.disableLoading = false;
    this.showMoreBtn = true;
  }

  ngOnInit() {
    this.getMore();
  }

  isShowMoreBtn(moreProductLength) {
    if (moreProductLength && moreProductLength.length > 0) {
      return true;
    }
    else
      return false;
  }

  getMore() {
    if (this.products) {
      this.queryString = 'skip=' + this.products.length;
    }
    this.disableLoading = false;

    this.service.load(this.queryString).subscribe(products => {
      console.log(products);
      this.disableLoading = true;
      this.showMoreBtn = this.isShowMoreBtn(products);

      this.products = [...this.products, ...products];
    }, error => {
      console.log(error);
      this.router.navigate(['/not-found']);
    });
  }

}
