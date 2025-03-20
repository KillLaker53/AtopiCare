import { Injectable } from '@nestjs/common';
import { IThread } from '../interface/thread.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadCardDto } from '../dto/thread_card.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('Thread') private threadModel: Model<IThread>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllThreads() {
    const threads: IThread[] = await this.threadModel.find();

    const threadCards = threads.map(async (thread: IThread) => {
      const user: User | null = await this.userRepository.findOne({
        where: { id: thread.user_id },
        select: { username: true },
      });
      
      if (user == null) {
        return null;
      }

      return new ThreadCardDto(thread, user.username);
    });

    return threadCards;
  }

  async getThreadById(threadId) {
    return this.threadModel.findById(threadId);
  }
}
