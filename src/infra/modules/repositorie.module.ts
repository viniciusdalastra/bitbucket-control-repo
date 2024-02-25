import { Module } from '@nestjs/common';
import { RepositorieController } from 'src/presentation/http/repositorie.controller';
import { BitbucketProvider } from '../providers/bitbucket.provider';
import { CreatePullRequestByDefaultJsonUseCase } from 'src/core/use-case/createPullRequestByDefaultJson.use-case';
import { GetDefaultRepositoriesUseCase } from 'src/core/use-case/getDefaultRepositories.use-case';
import { CreatePullRequestFromRepositorieUseCase } from 'src/core/use-case/createPullRequestFromRepositorie.use-case';

@Module({
  imports: [],
  controllers: [RepositorieController],
  providers: [
    BitbucketProvider,
    CreatePullRequestByDefaultJsonUseCase,
    GetDefaultRepositoriesUseCase,
    CreatePullRequestFromRepositorieUseCase,
  ],
})
export class RepositorieModule {}
