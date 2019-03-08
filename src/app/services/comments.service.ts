import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public addNewCommentId: EventEmitter<string> = new EventEmitter();

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getIdComments(bike_id: string, skip: number = 0, take: number = 10) {
    //skip=0&take=5&bike_id=1
    let queryString = 'skip=' + skip + '&take=' + take + '&bike_id=' + bike_id;
    return this.http.get(this.apiUrl + 'comments' + '?' + queryString);
  }

  getCommentById(commentId: any) {
    return this.http.get(this.apiUrl + 'comments' + '/' + commentId);
  }

  createComment(commnetModel: any, httpHeaders: any) {
    return this.http.post(this.apiUrl + 'comments' + '/', commnetModel, httpHeaders);
  }

  doUpdatecommentIdList(id) {
    this.addNewCommentId.emit(id);
  }
}
