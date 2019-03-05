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

  create(newBike: any, httpHeaders: any) {
    return this.http.post(this.apiUrl + "/bikes", newBike, httpHeaders);
  }

  getDetailBike(id) {
    return this.http.get(this.apiUrl + "/bikes" + "/" + id);
  }

  deleteBike(id: any, httpHeaders: any) {
    return this.http.delete(this.apiUrl + "/bikes" + "/" + id, httpHeaders);
  }
}
