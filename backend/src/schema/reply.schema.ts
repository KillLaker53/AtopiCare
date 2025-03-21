import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Reply {
  @Prop({ type: Number })
  userId: number;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  date: string;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
