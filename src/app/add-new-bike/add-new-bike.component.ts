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

  public isDisabled = true;

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
      errors => {
        console.log(errors)
        if (errors.status == 401) {
          this.messages = 'User is not valid, login again';
          this.auth.isValidatedToken();
        } else {
          this.messages = errors.message;
        }
      }
    )
  }

  processFile(input) {
    this.messages = '';
    this.isDisabled = true;

    if (input.files && input.files[0]) {
      if (input.files[0].size / 1000 > 100) {
        this.messages = 'Image size must be less than 100KB';
        return;
      }
      var img = new Image();
      img.onload = () => {
        if (img.width == 200 && img.height == 200) {

          //load file
          let imageFile = new FileReader();
          imageFile.onload = (event: any) => {
            this.newBike.thumbnailImage = event.target.result.split(',').pop();
            this.isDisabled = false;
          }
          imageFile.readAsDataURL(input.files[0]);
        } else {
          //fail
          this.messages = 'Image resolution must be 200x200';
        }
      }
      img.src = window.URL.createObjectURL(input.files[0]);
    }
  }

}
