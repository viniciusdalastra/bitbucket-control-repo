import { Injectable } from '@nestjs/common';
import { BitbucketProvider } from 'src/infra/providers/bitbucket.provider';
import { RepositoriePullRequestsDto } from 'src/shared/dtos/repositoriePullRequestsDto.dto';

@Injectable()
export class CreatePullRequestFromRepositorieUseCase {
  private pullRequestCreated = [];
  constructor(private provider: BitbucketProvider) {
    this.pullRequestCreated = [];
  }

  async execute(body: RepositoriePullRequestsDto) {
    const { repositorie } = body;
    console.log(`process repositorie ${repositorie.name}`);
    await this.removeOldestBranch(repositorie, body);

    const newBranchCreated = await this.createNewBranch(repositorie, body);

    await this.createPullRequest(repositorie, newBranchCreated, body.to);

    return this.pullRequestCreated;
  }

  private async createNewBranch(repositorie, body) {
    const newBranch = await this.getNewBranch(repositorie, body);

    return await this.provider.createBranchsFromRepositorie(
      repositorie.workspace,
      repositorie.uuid,
      newBranch,
    );
  }

  private async createPullRequest(repositorie, branch, to) {
    const pullRequest = {
      title: `Sync: ${branch.name}`,
      source: {
        branch: {
          name: branch.name,
        },
      },
      destination: {
        branch: {
          name: to,
        },
      },
    };

    const pullRequestCreated = await this.provider.createPullRequest(
      repositorie.workspace,
      repositorie.uuid,
      pullRequest,
    );

    if (pullRequestCreated) {
      const diffStatPr = await this.provider.checkDiffPullRequest(
        repositorie.workspace,
        repositorie.uuid,
        pullRequestCreated.id,
      );

      if (diffStatPr.size > 0) {
        this.pullRequestCreated.push({
          id: pullRequestCreated.id,
          name: repositorie.name,
          branch: branch.name,
          links: pullRequestCreated.links,
        });
      } else {
        this.provider.declinePullRequest(
          repositorie.workspace,
          repositorie.uuid,
          pullRequestCreated.id,
        );
        this.provider.deleteBranchRepositorieFromName(
          repositorie.workspace,
          repositorie.uuid,
          branch.name,
        );
      }
    } else {
      this.provider.deleteBranchRepositorieFromName(
        repositorie.workspace,
        repositorie.uuid,
        branch.name,
      );
    }
  }

  private async removeOldestBranch(repositorie, body) {
    const branchExists = await this.provider.getBranchRepositorieFromName(
      repositorie.workspace,
      repositorie.uuid,
      `sync-${body.from}-${body.to}`,
    );
    if (branchExists) {
      await this.provider.deleteBranchRepositorieFromName(
        repositorie.workspace,
        repositorie.uuid,
        branchExists.name,
      );
    }
  }

  private async getNewBranch(repositorie, body) {
    const branchFrom = await this.provider.getBranchRepositorieFromName(
      repositorie.workspace,
      repositorie.uuid,
      body.from,
    );
    return {
      name: `sync-${body.from}-${body.to}`,
      target: { hash: branchFrom.target.hash },
    };
  }
}
