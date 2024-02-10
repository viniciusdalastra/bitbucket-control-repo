import { Module } from '@nestjs/common';
import { RepositorieController } from 'src/presentation/http/repositorie.controller';

@Module({
  imports: [],
  controllers: [RepositorieController],
  providers: [],
})
export class RepositorieModule {}
