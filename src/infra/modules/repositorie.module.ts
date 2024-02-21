import { Module } from '@nestjs/common';
import { RepositorieController } from 'src/presentation/http/repositorie.controller';
import { BitbucketProvider } from '../providers/bitbucket.provider';
import { CreatePullRequestByDefaultJson } from 'src/core/use-case/createPullRequestByDefaultJson.use-case';

@Module({
  imports: [],
  controllers: [RepositorieController],
  providers: [BitbucketProvider, CreatePullRequestByDefaultJson],
})
export class RepositorieModule {}
