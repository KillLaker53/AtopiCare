import { IThread } from '../interface/thread.interface';
import { IReply } from '../interface/reply.interface';

export class ThreadCardDto {
  id: string;
  title: string;
  ownerUsername: string;
  date: string;
  replies: IReply[];

  constructor(thread: IThread, username: string) {
    this.id = thread._id.toString();
    this.title = thread.title;
    this.date = thread.date;
    this.ownerUsername = username;
    this.replies = thread.replies;
  }
}
