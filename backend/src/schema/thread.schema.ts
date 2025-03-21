import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Reply } from './reply.schema';
import { IReply } from '../interface/reply.interface';

@Schema()
export class Thread {
  @Prop({ type: Number })
  user_id: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  content: string;

  // @Prop({ type: [{ content: String, ownerUsername: String, date: String, userId: Number }] })
  // replies: IReply[];
  @Prop({ type: Array<{content: String, ownerUsername: String, date: String, userId: Number}> })
  replies: Reply[];
   //replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
