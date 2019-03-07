import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { HttpHeaders } from '@angular/common/http';
import { EmitRemoveProductService } from '../services/emit-remove-product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public systemAdmin = false;
  private httpOptions: any;


  public readonly assetsUrl = environment.assetsThumbnailUrl;
  public readonly defaultImg = environment.url + 'default.jpg';
  public imageSrc: String;
  @Input() product: any

  constructor(
    private auth: AuthService,
    private productSevice: ProductsService,
    private emitRemoveProduct: EmitRemoveProductService
  ) {
    this.imageSrc = this.defaultImg;
  }

  ngOnInit() {
    this.imageSrc = this.assetsUrl + this.product.thumbnailImage;

    if (this.auth.isAuhtenticated()) {
      this.systemAdmin = this.auth.getUserInfo()['useremail'] === 'boss@gmail.com';
      console.log(this.product);

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.auth.getToken()
        })
      }
    }
  }

  deleteBtn() {
    this.productSevice.deleteBike(this.product.id, this.httpOptions).subscribe(
      res => {
        console.log('Delete Success');
        this.emitRemoveProduct.doUpdateDashboard(this.product.id);
      },
      errors => {
        console.log(errors);
      });
  }
}
