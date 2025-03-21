import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ObjectId } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Reply {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: Number })
  userId: number;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  date: string;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
