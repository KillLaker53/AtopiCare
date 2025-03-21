import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
type AuthInput = { username: string; password: string };
type SignInData = { userId: number; username: string };
type AuthResult = { accessToken: string; userId: number; username: string };
export type RegisterInput = { username: string, password: string, firstName: string, lastName: string, email: string }

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {

    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }
  async register(input: RegisterInput): Promise<AuthResult> {
    console.log(input.username);
    const user = await this.usersService.findUserByName(input.username);
    if(user){
      throw new ConflictException("User already exists");
    }
    input.password = await this.hashPassword(input.password);
    const newUser = await this.usersService.createUser(input);
    if(!newUser){
      throw new Error("User failed to create");
    }
    return this.signIn({
      username: newUser.username,
      userId: newUser.id
    });
  }
  
  
  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByName(input.username);
    const hashedPassword = await this.hashPassword(input.password);
    if (user && user.password === hashedPassword) {
      return {
        userId: user.id,
        username: user.username,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, username: user.username, userId: user.userId };
  }
  
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
