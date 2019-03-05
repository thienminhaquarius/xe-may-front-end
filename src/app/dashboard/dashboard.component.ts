import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductsService, ProductInterface } from '../services/products.service';
import { Router } from '@angular/router';
import { EmitRemoveProductService } from '../services/emit-remove-product.service'

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
    private router: Router,
    private emitRemoveProduct: EmitRemoveProductService
  ) {
    console.log(this.products);
    this.products = [];
    this.queryString = '';
    this.disableLoading = false;
    this.showMoreBtn = true;

    this.emitRemoveProduct.updateDashboard.subscribe((id) => {
      console.log(id);
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id) {
          this.products.splice(i, 1);
          return;
        }
      }
    });
  }

  ngOnInit() {
    // this.getMore();
    // setInterval(() => {
    //   this.products.splice(0, 1);
    // }, 3000);

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
      // console.log(products);
      this.disableLoading = true;
      this.showMoreBtn = this.isShowMoreBtn(products);

      this.products = [...this.products, ...products];
    }, error => {
      console.log(error);
      this.router.navigate(['/not-found']);
    });
  }

}
