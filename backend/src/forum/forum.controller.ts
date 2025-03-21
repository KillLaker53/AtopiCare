import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ForumService } from './forum.service';
import {ThreadPostDto} from "../dto/thread_post.dto";
import {ReplyPostDto} from "../dto/reply_post.dto";

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

  @Post('/threads/add')
  saveThread(@Body() thread: ThreadPostDto) {
    this.forumService.saveThread(thread);
  }

  @Post('/threads/reply/add')
  saveReply(@Body() reply: ReplyPostDto) {
    this.forumService.saveReply(reply);
  }
}
