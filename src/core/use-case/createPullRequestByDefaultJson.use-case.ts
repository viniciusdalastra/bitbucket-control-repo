import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BitbucketProvider } from 'src/infra/providers/bitbucket.provider';
import { DefaultPullRequestsDto } from 'src/shared/dtos/defaultPullRequestsDto.dto';

@Injectable()
export class CreatePullRequestByDefaultJson {
  private pullRequestCreated = [];
  constructor(private provider: BitbucketProvider) {
    this.pullRequestCreated = [];
  }

  async execute(body: DefaultPullRequestsDto) {
    const repositories = this.loadJson();
    for (const repositorie of repositories) {
      console.log(`process repositorie ${repositorie.name}`);
      const branchExists = await this.provider.getBranchRepositorieFromName(
        repositorie.workspace,
        repositorie.uuid,
        `sync-${body.from}-${body.to}`,
      );
      if (branchExists) {
        await this.createPullRequest(repositorie, branchExists, body.to);
      } else {
        const branchFrom = await this.provider.getBranchRepositorieFromName(
          repositorie.workspace,
          repositorie.uuid,
          body.from,
        );
        const newBranch = {
          name: `sync-${body.from}-${body.to}`,
          target: { hash: branchFrom.target.hash },
        };

        const newBranchCreated =
          await this.provider.createBranchsFromRepositorie(
            repositorie.workspace,
            repositorie.uuid,
            newBranch,
          );
        await this.createPullRequest(repositorie, newBranchCreated, body.to);
      }
    }

    return this.pullRequestCreated;
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
      this.pullRequestCreated.push({
        name: repositorie.name,
        branch: branch.name,
        links: pullRequestCreated.links,
      });
    } else {
      this.provider.deleteBranchRepositorieFromName(
        repositorie.workspace,
        repositorie.uuid,
        branch.name,
      );
    }
  }

  private loadJson() {
    try {
      const conteudoArquivo = fs.readFileSync(
        'src/shared/files/repo.json',
        'utf8',
      );
      return JSON.parse(conteudoArquivo);
    } catch (error) {
      throw new Error(`Error on load JSON: ${error.message}`);
    }
  }
}
