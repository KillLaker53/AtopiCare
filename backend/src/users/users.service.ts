import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from 'src/authentication/authentication.service';
import { Role } from 'src/enum/role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByName(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy( { username: username });
   
    return user;
  }
  
  async createUser(input: RegisterInput ): Promise<User | null> {
    console.log("asd");
    const user: User = new User();
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    user.email = input.email;
    user.username = input.username;
    user.password = input.password;
    user.role = Role.reg;
    return this.userRepository.save(user);
  } 

  
}
