import { Module } from '@nestjs/common';
import { LoginController } from 'src/presentation/http/login.controller';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [],
})
export class LoginModule {}
