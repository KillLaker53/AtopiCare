import { IThread } from '../interface/thread.interface';

export class ThreadCardDto {
  id: string;
  title: string;
  ownerUsername: string;
  date: string;

  constructor(thread: IThread, username: string) {
    this.id = thread._id;
    this.title = thread.title;
    this.date = thread.date;
    this.ownerUsername = username;
  }
}
