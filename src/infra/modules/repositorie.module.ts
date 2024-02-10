import { Module } from '@nestjs/common';
import { RepositorieController } from 'src/presentation/http/repositorie.controller';
import { BitbucketProvider } from '../providers/bitbucket.provider';

@Module({
  imports: [],
  controllers: [RepositorieController],
  providers: [BitbucketProvider],
})
export class RepositorieModule {}
