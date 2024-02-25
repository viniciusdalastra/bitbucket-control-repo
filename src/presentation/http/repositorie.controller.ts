import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePullRequestByDefaultJsonUseCase } from 'src/core/use-case/createPullRequestByDefaultJson.use-case';
import { CreatePullRequestFromRepositorieUseCase } from 'src/core/use-case/createPullRequestFromRepositorie.use-case';
import { GetDefaultRepositoriesUseCase } from 'src/core/use-case/getDefaultRepositories.use-case';
import { LocalAuthGuard } from 'src/infra/auth/auth.guard';
import { BitbucketProvider } from 'src/infra/providers/bitbucket.provider';
import { CreateBranchDto } from 'src/shared/dtos/createBranch.dto';
import { DefaultPullRequestsDto } from 'src/shared/dtos/defaultPullRequests.dto';
import { DeleteBranchDto } from 'src/shared/dtos/deleteBranch.dto';
import { PullRequestDto } from 'src/shared/dtos/pullRequest.dto';
import { RepositoriePullRequestsDto } from 'src/shared/dtos/repositoriePullRequestsDto.dto';

@Controller('repositorie')
@ApiTags('Repositorie')
@ApiBearerAuth()
export class RepositorieController {
  constructor(
    private readonly provider: BitbucketProvider,
    private readonly createPullRequestByDefaultJsonUseCase: CreatePullRequestByDefaultJsonUseCase,
    private readonly createPullRequestFromRepositorieUseCase: CreatePullRequestFromRepositorieUseCase,
    private readonly getDefaultRepositoriesUseCase: GetDefaultRepositoriesUseCase,
  ) {}

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

  @Get('default')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get all Default Repositories' })
  async getDefaultRepositories() {
    return await this.getDefaultRepositoriesUseCase.execute();
  }

  @Post('default/pull-request/all')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Create Default Pull Request from all defaults repositories',
  })
  async makePullRequestDefault(@Body() body: DefaultPullRequestsDto) {
    return await this.createPullRequestByDefaultJsonUseCase.execute(body);
  }

  @Post('default/pull-request')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Create Pull Request from one default repositorie' })
  async makePullRequestByRepositorieDefault(
    @Body() body: RepositoriePullRequestsDto,
  ) {
    return await this.createPullRequestFromRepositorieUseCase.execute(body);
  }

  @Delete('branch')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Delete Branch from Name' })
  async deleteBranch(@Body() body: DeleteBranchDto) {
    return await this.provider.deleteBranchRepositorieFromName(
      body.workspace,
      body.uuid,
      body.name,
    );
  }

  @Get('branch/:workspace/:repositorie/:name')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'get Branch from Name' })
  async getBranch(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Param('name') name: string,
  ) {
    return await this.provider.getBranchRepositorieFromName(
      workspace,
      repositorie,
      name,
    );
  }

  @Get('branch/:workspace/:repositorie')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get Branchs' })
  async getBranchs(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
  ) {
    return await this.provider.getBranchsFromRepositorie(
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
    return await this.provider.createBranchsFromRepositorie(
      workspace,
      repositorie,
      body,
    );
  }

  @Post('pull-request/:workspace/:repositorie/:id/diff')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Check difference in pull request' })
  async checkDiffPullRequest(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Param('id') id: string,
  ) {
    return await this.provider.checkDiffPullRequest(workspace, repositorie, id);
  }

  @Post('pull-request/:workspace/:repositorie/:id/merge')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Merge in pull request' })
  async mergePullRequest(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Param('id') id: string,
  ) {
    return await this.provider.mergePullRequest(workspace, repositorie, id);
  }

  @Post('pull-request/:workspace/:repositorie/:id/decline')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Decline in pull request' })
  async declinePullRequest(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Param('id') id: string,
  ) {
    return await this.provider.declinePullRequest(workspace, repositorie, id);
  }

  @Post('pull-request/:workspace/:repositorie')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Check difference in pull request' })
  async createPullRequest(
    @Param('workspace') workspace: string,
    @Param('repositorie') repositorie: string,
    @Body() pullRequest: PullRequestDto,
  ) {
    return await this.provider.createPullRequest(
      workspace,
      repositorie,
      pullRequest,
    );
  }
}
