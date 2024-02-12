import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infra/auth/auth.guard';
import { BitbucketProvider } from 'src/infra/providers/bitbucket.provider';
import { CreateBranchDto } from 'src/shared/dtos/createBranch.dto';
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
  async getRepositories(@Query() query) {
    const { page, pagelen } = query;
    return await this.provider.getRepositories(page, pagelen);
  }

  @Get('workspaces')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get Workspaces' })
  async getWorkspaces(@Query() query) {
    const { page, pagelen } = query;
    return await this.provider.getWorkspaces(page, pagelen);
  }

  @Get('branch/:workspace/:repositorie')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get Branchs' })
  async getBranchs(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
  ) {
    return await this.provider.getBranchsFromPullRequest(
      workspace,
      repositorie,
    );
  }

  @Post('branch/:workspace/:repositorie')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Create Branchs' })
  async createBranchs(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Body() body: CreateBranchDto,
  ) {
    return await this.provider.createBranchsFromPullRequest(
      workspace,
      repositorie,
      body,
    );
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
