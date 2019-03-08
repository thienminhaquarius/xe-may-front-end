import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadListbikeId(skip: number = 0, take: number = 8) {
    let queryString = 'skip=' + skip + '&take=' + take;
    return this.http.get(this.apiUrl + "bikes" + "?" + queryString);
  }

  create(newBike: any, httpHeaders: any) {
    return this.http.post(this.apiUrl + "bikes", newBike, httpHeaders);
  }

  getDetailBike(id, httpHeaders: any) {
    return this.http.get(this.apiUrl + "bikes" + "/" + id, httpHeaders);
  }

  deleteBike(id: any, httpHeaders: any) {
    return this.http.delete(this.apiUrl + "bikes" + "/" + id, httpHeaders);
  }

  createOrUpdateRating(ratingModel: any, httpHeaders: any) {
    return this.http.post(this.apiUrl + "ratings", ratingModel, httpHeaders);
  }

  getBikeDashboard(id: string = null) {
    return this.http.get(this.apiUrl + "bikedashboard?id=" + id);
  }
}
