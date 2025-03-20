export interface IReply extends Document {
  user_id: number;
  content: string;
  date: string;
  replies: IReply[];
}
