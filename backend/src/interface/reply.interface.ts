export interface IReply extends Document {
  user_id: number;
  message: string;
  date: string;
  replies: IReply[];
}
