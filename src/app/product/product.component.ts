import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public readonly assetsUrl = environment.assetsThumbnailUrl;
  @Input() product: any

  constructor() { }

  ngOnInit() {
  }

}
