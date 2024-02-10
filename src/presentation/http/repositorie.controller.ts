import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infra/auth/auth.guard';
import { BitbucketProvider } from 'src/infra/providers/bitbucket.provider';
import { MergeDto } from 'src/shared/dtos/merge.dto';
import { PullRequestDto } from 'src/shared/dtos/pullRequest.dto';

@Controller('repositorie')
@ApiTags('Repositorie')
@ApiBearerAuth()
export class RepositorieController {
  constructor(private readonly provider: BitbucketProvider) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get Repositories' })
  async getRepositories() {
    return await this.provider.getRepositories();
  }

  @Post('pull-request')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Create Pull Request' })
  async createPullRequest(@Body() body: PullRequestDto) {
    return await this.provider.createPullRequest(body);
  }

  @Post('merge/:workspace/:repositorie/:pullRequest')
  @ApiOperation({ summary: 'Merge Pull Request' })
  @ApiParam({ name: 'workspace', description: 'workspace id', type: String })
  @ApiParam({
    name: 'repositorie',
    description: 'repositorie id',
    type: String,
  })
  @ApiParam({
    name: 'pullRequest',
    description: 'pull Request id',
    type: String,
  })
  @UseGuards(LocalAuthGuard)
  async mergePullRequest(
    @Body() body: MergeDto,
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Param('pullRequest') pullRequest: string,
  ) {
    return await this.provider.mergePullRequest(
      workspace,
      repositorie,
      pullRequest,
      body,
    );
  }
}
