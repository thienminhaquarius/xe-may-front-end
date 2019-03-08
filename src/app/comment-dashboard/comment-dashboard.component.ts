import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../services/comments.service';


@Component({
  selector: 'app-comment-dashboard',
  templateUrl: './comment-dashboard.component.html',
  styleUrls: ['./comment-dashboard.component.scss']
})
export class CommentDashboardComponent implements OnInit {

  @Input() bike_id: string

  public listCommentId: any = [];

  constructor(
    private comments: CommentsService
  ) { }

  ngOnInit() {
    this.comments.getIdComments(this.bike_id).subscribe(
      listCommentId => {
        this.listCommentId = listCommentId;
        // console.log(listCommentId);
      },
      errors => {
        // console.log(errors.error);

      });

    this.comments.addNewCommentId.subscribe((commentId: string) => {
      // console.log(commentId);
      this.unshiftCommentIdObj(commentId)
    })
  }

  unshiftCommentIdObj(id: string) {
    this.listCommentId.unshift({ id: id });
  }

}
