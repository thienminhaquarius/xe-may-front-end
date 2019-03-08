import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentsService } from '../services/comments.service';
import { HttpHeaders } from '@angular/common/http';

class commentModel {
  title: string = 'This Bike'
  content: string = 'Good'
  user_id: string
  bike_id: string
}

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  @Input() bike_id: string;

  public createCommentModel = new commentModel;
  public isDisabled: boolean = true;
  public message: string = '';
  private httpOptions: any;

  constructor(
    private auth: AuthService,
    private comments: CommentsService
  ) { }

  ngOnInit() {
    if (this.auth.isAuhtenticated()) {
      this.isDisabled = false;
      this.createCommentModel.user_id = this.auth.getUserInfo()['sub'];
      this.createCommentModel.bike_id = this.bike_id;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.auth.getToken()
        })
      }
    }
  }

  createComment() {
    this.message = '';
    this.isDisabled = true;

    this.comments.createComment(this.createCommentModel, this.httpOptions).subscribe(
      newComment => {
        console.log(newComment);
        this.comments.doUpdatecommentIdList(newComment['id']);

        this.message = 'Create comment Success';
        this.isDisabled = false;
      },
      errors => {
        this.message = JSON.stringify(errors.error);
        this.isDisabled = false;
      }
    );
  }

}
