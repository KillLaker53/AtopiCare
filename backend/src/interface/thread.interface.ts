import { IReply } from './reply.interface';

export interface IThread extends Document {
  user_id: number;
  title: string;
  date: string;
  replies: IReply[];
}
