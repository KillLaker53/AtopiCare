import { IThread } from '../interface/thread.interface';
import { IReply } from '../interface/reply.interface';
import {ReplySelectedDto} from "./reply_selected.dto";

export class ThreadSelectedDto {
  id: string;
  title: string;
  ownerUsername: string;
  date: string;
  replies: (ReplySelectedDto | null)[];

  constructor(thread: IThread, username: string) {
    this.id = thread._id.toString();
    this.title = thread.title;
    this.date = thread.date;
    this.ownerUsername = username;
  }
}
