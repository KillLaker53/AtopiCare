import { IReply } from './reply.interface';

export interface IThread extends Document {
  _id: string;
  user_id: number;
  title: string;
  date: string;
  content: string;
  replies: IReply[];
}
