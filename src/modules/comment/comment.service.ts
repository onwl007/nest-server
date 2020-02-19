import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from './comment.dto';
import { CommentModelToken } from './comment.model';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentModelToken) private readonly commentModel: Model<Comment>,
  ) {}
}
