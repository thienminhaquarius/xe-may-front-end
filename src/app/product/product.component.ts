import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { HttpHeaders } from '@angular/common/http';
import { EmitRemoveProductService } from '../services/emit-remove-product.service'


import { Img } from '../defaultImageStr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public systemAdmin: boolean = false;
  public isDisabledDeleteBtn: boolean = false;
  private httpOptions: any;

  public readonly assetsUrl = environment.assetsThumbnailUrl;
  public readonly defaultImg = Img.size200x200;
  public imageSrc: String;
  @Input() bike_id: any
  public bike: any = {};

  constructor(
    private auth: AuthService,
    private productSevice: ProductsService,
    private emitRemoveProduct: EmitRemoveProductService
  ) {
    this.imageSrc = this.defaultImg;
  }

  ngOnInit() {
    // this.imageSrc = this.assetsUrl + this.product.thumbnailImage;

    this.productSevice.getBikeDashboard(this.bike_id).subscribe(
      bike => {
        this.bike = bike;
        this.imageSrc = this.assetsUrl + this.bike.thumbnailImage;
        console.log(this.bike);
      },
      errors => {

      }
    )

    if (this.auth.isAuhtenticated()) {
      this.systemAdmin = this.auth.getUserInfo()['useremail'] === 'boss@gmail.com';
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.auth.getToken()
        })
      }
    }
  }

  deleteBtn() {
    this.isDisabledDeleteBtn = true;

    this.productSevice.deleteBike(this.bike_id, this.httpOptions).subscribe(
      res => {
        console.log('Delete Success');
        this.emitRemoveProduct.doUpdateDashboard(this.bike_id);
      },
      errors => {
        console.log(errors.error);
      });
  }
}
