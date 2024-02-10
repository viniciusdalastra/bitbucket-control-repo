import axios, { AxiosInstance } from 'axios';
import { MergeDto } from 'src/shared/dtos/merge.dto';
import { PullRequestDto } from 'src/shared/dtos/pullRequest.dto';

export class BitbucketProvider {
  private url = 'https://api.bitbucket.org/2.0/';
  private request: AxiosInstance;

  constructor() {
    this.request = axios.create();
    this.request.interceptors.request.use(async (config) => {
      config.headers.Authorization = `Bearer ${process.env.BITBUCKET_TOKEN}`;
      config.headers.Accept = `application/json`;
      return config;
    });
  }

  public async getRepositories() {
    const url = this.url + 'user/permissions/repositories';
    return await this.request.get(url);
  }

  public async createPullRequest(data: PullRequestDto) {
    const url =
      this.url + '/repositories/my-workspace/my-repository/pullrequests';
    return await this.request.post(url, data);
  }

  public async mergePullRequest(
    workspace: string,
    repositorie: string,
    pullRequest: string,
    data: MergeDto,
  ) {
    const url =
      this.url +
      `/repositories/${workspace}/${repositorie}/pullrequests/${pullRequest}/merge`;
    return await this.request.post(url, data);
  }
}
