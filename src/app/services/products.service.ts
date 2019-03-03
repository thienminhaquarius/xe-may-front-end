import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


export interface ProductInterface {
  id: string,
  name: string,
  price: number,
  picture: string,
  created_at: string,
  updated_at: string
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  load(queryString) {
    return this.http.get<Array<ProductInterface>>(this.apiUrl + "/bikes" + "?" + queryString);
  }

  create() {
    return this.http.post(this.apiUrl + "/bikes", {}, {});
  }
}
