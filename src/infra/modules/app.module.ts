import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/http/app.controller';
import { ConfigModule } from '@nestjs/config';
import { LocalAuthGuard } from '../auth/auth.guard';
import { LoginModule } from './login.module';
import { RepositorieModule } from './repositorie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    LoginModule,
    RepositorieModule,
  ],
  controllers: [AppController],
  providers: [LocalAuthGuard],
})
export class AppModule {}
