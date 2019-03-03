import { Component, OnInit } from '@angular/core';


import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { Router, ActivatedRoute } from "@angular/router";

class newBike {
  name: string
  price: number
  thumbnailImage: any

  info: string
  // detailImg1: any
  // detailImg2: any
  // detailImg3: any

}

@Component({
  selector: 'app-add-new-bike',
  templateUrl: './add-new-bike.component.html',
  styleUrls: ['./add-new-bike.component.css']
})
export class AddNewBikeComponent implements OnInit {
  public messages: string = '';
  public newBike = new newBike;
  private httpOptions: any;


  constructor(
    private products: ProductsService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.newBike.name = 'Winner';
    this.newBike.price = 10000000;
    this.newBike.info = 'reeeeeeeeeeeeeeeeeeeeeeeeeeee';
  }

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getToken()
      })
    }
  }

  createBike() {
    this.messages = '';
    this.products.create(this.newBike, this.httpOptions).subscribe(
      res => {
        console.log(res)
        this.messages = 'Success';
        this.router.navigate(['/']);
      },
      error => {
        let errorString = JSON.stringify(error.error)
        this.messages = errorString;
      }
    )
  }

  processFile(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        // console.log('e: ', event.target.result);
        this.newBike.thumbnailImage = event.target.result.split(',').pop();

      }
      reader.readAsDataURL(input.files[0]);
    }
  }

}
