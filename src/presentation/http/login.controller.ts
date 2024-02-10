import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from 'src/shared/dtos/loginAuth.dto';
const jwt = require('jsonwebtoken');

@Controller('auth')
@ApiTags('Auth')
export class LoginController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Auth' })
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
