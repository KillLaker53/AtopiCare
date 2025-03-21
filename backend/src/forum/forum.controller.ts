import { Controller, Get, Param } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('/threads')
  getAllThreads() {
    return this.forumService.getAllThreads();
  }

  @Get('/threads/:id')
  getThreadById(@Param('id') id: string) {
    return this.forumService.getThreadById(id);
  }
}
