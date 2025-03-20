import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Reply {
  @Prop({ type: Number })
  user_id: number;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  date: string;

  @Prop({ type: [Reply] })
  replies: Reply[];
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
