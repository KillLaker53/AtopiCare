import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Reply } from './reply.schema';

@Schema({ _id: false })
export class Thread {
  @Prop({ type: Number })
  user_id: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Date })
  date: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: [Reply] })
  replies: Reply[];
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
