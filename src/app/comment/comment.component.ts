import { Component, OnInit, Input } from '@angular/core';

import { Img } from '../defaultImageStr';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentId: any = null;

  public commentModel: any = null;
  public imgSrc = Img.size64x64;


  constructor(
    private comments: CommentsService
  ) { }

  ngOnInit() {
    console.log('sdsssssss', this.commentId);
    this.comments.getCommentById(this.commentId).subscribe(
      comment => {
        console.log(comment);
        this.commentModel = comment;
      },
      errors => {
        console.log('comment', errors);
      }
    );
  }

}
