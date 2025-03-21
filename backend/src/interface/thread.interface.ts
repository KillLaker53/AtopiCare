import { IReply } from './reply.interface';

export interface IThread extends Document {
  _id: string;
  userId: number;
  title: string;
  date: string;
  content: string;
  replies: IReply[];
}
