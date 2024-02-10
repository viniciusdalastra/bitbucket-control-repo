import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from 'src/shared/dtos/LoginAuth.dto';
const jwt = require('jsonwebtoken');

@Controller('auth')
@ApiTags('Auth')
export class LoginController {
  constructor() {}

  @Post()
  auth(@Body() body: LoginAuthDto): string {
    console.log(body);
    console.log(process.env.JWT_AUTH_KEY);
    if (
      body.login === process.env.LOGIN &&
      body.password === process.env.PASSWORD
    ) {
      const token = jwt.sign({ ...body }, process.env.JWT_AUTH_KEY);
      return token;
    }
    throw new UnauthorizedException();
  }
}
