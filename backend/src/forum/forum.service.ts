import { Injectable } from '@nestjs/common';
import { IThread } from '../interface/thread.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadCardDto } from '../dto/thread_card.dto';
import {ThreadSelectedDto} from "../dto/thread_selected.dto";
import {ReplySelectedDto} from "../dto/reply_selected.dto";
import {ThreadPostDto} from "../dto/thread_post.dto";
import {ThreadSaveDto} from "../dto/thread_save.dto";
import {ReplySaveDto} from "../dto/reply_save.dto";
import {ReplyPostDto} from "../dto/reply_post.dto";

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('Thread') private threadModel: Model<IThread>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllThreads() {
    const threads: IThread[] = await this.threadModel.find();

    const threadCards = Promise.all(threads.map(async (thread: IThread) => {
      const user: User | null = await this.userRepository.findOne({
        where: { id: thread.userId },
        select: { username: true },
      });

      if (user == null) {
        return null;
      }

      return new ThreadCardDto(thread, user.username);
    }));

    return threadCards;
  }

  async getThreadById(threadId) {
    const thread: IThread | null = await this.threadModel.findById(threadId).exec();

    if(thread == null) {
      return null;
    }

    const user: User | null = await this.userRepository.findOne({
      where: { id: thread.userId },
      select: { username: true },
    });

    if(user == null) {
      return null;
    }

    const selectedThread = new ThreadSelectedDto(thread, user.username)

    selectedThread.replies = await Promise.all((thread.replies).map(async (reply) => {
      const user: User | null = await this.userRepository.findOne({
        where: { id: thread.userId },
        select: { username: true },
      });

      console.log(thread)

      if(user == null) {
        return null;
      }

      const newper = new ReplySelectedDto(reply, user.username);
      return newper;
    }));

    return selectedThread;
  }

  async saveThread(thread: ThreadPostDto) {
    const threadUser = await this.userRepository.findOne({
      where: {
        username: thread.ownerUsername
      },
      select: {
        id: true
      },
    });

    if(threadUser == null) {
      return null;
    }

    const saveThread = new ThreadSaveDto(thread, threadUser.id);

    const newThread = new this.threadModel(saveThread);

    await newThread.save();

    return new ThreadSelectedDto(newThread, thread.ownerUsername);
  }

  async saveReply(reply: ReplyPostDto) {
    const thread = await this.threadModel.findById(reply.threadId)

    console.log(thread);

    if(thread == null) {
      return null;
    }

    const replyUser = await this.userRepository.findOne({
      where: {
        username: reply.ownerUsername
      },
      select: {
        id: true
      },
    });

    if(replyUser == null) {
      return null;
    }

    const newReply = {
      userId: replyUser.id,
      content: reply.content,
      ownerUsername: reply.ownerUsername,
      date: new Date().toLocaleString(),
    };

    thread.replies.push(newReply);

    console.log(thread);

    thread.markModified('replies');

    await thread.save();

    const returnedReply: ReplySelectedDto = {
      ownerUsername: newReply.ownerUsername,
      date: newReply.date,
      content: newReply.content,
    }

    return returnedReply;
  }
}
