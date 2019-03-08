import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetDataService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  database() {
    return this.http.get(this.apiUrl + 'admins');
  }
}
