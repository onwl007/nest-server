import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentProvider } from './comment.model';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, CommentProvider],
  exports: [CommentService],
})
export class CommentModule {}
