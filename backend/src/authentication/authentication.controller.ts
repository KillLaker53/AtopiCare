import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { Request } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}


  @Post('/login')
  loginUser(@Req() request: Request) {

    const input = { username: request.body.username, password: request.body.password}
    return this.authenticationService.authenticate(input);
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  getUserInfo(@Req() request): void {
    return request.user;
  }
  
  @Post("/register")
  registerUser(@Req() request: Request) {
    const input = { username: request.body.username, password: request.body.password, firstName: request.body.firstName, lastName: request.body.lastName, email: request.body.email }
    return this.authenticationService.register(input);
  }

}
