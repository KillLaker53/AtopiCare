import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByName(username: string): Promise<User | null> {
    const users: User[] = await this.userRepository.find();
    const user = await this.userRepository.findOneBy( { username: username });
    if (!user) {
      throw new NotFoundException(`User not found with username: ${username}`);
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  
}
