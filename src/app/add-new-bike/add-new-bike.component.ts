import { Component, OnInit } from '@angular/core';

class newBike {
  name: string
  price: number
  // thumbnailImage: any

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
  public newBike = new newBike


  constructor() { }

  ngOnInit() {
  }

  createBike() {
    console.log(this.newBike);
  }

}
