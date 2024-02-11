import axios, { AxiosInstance } from 'axios';
import { MergeDto } from 'src/shared/dtos/merge.dto';
import { PullRequestDto } from 'src/shared/dtos/pullRequest.dto';

export class BitbucketProvider {
  private url = 'https://api.bitbucket.org/2.0/';
  private request: AxiosInstance;

  constructor() {
    this.request = axios.create();
    this.request.interceptors.request.use(async (config) => {
      const credentials = btoa(
        `${process.env.LOGIN_BITBUCKET}:${process.env.PASSWORD_BITBUCKET}`,
      );
      config.headers.Authorization = `Basic ${credentials}`;
      config.headers.Accept = `application/json`;
      return config;
    });
  }

  public async getWorkspaces(page = 1, pagelen = 100) {
    const url = this.url + `workspaces?page=${page}&pagelen=${pagelen}`;

    const response = await this.request.get(url);
    return response.data;
  }

  public async getRepositories(page = 1, pagelen = 100) {
    const url =
      this.url +
      `user/permissions/repositories?page=${page}&pagelen=${pagelen}`;
    const response = await this.request.get(url);
    return response.data;
  }

  public async createPullRequest(data: PullRequestDto) {
    const url =
      this.url + '/repositories/my-workspace/my-repository/pullrequests';
    const response = await this.request.post(url, data);
    return response.data;
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
    const response = await this.request.post(url, {
      ...data,
      close_source_branch: true,
    });
    return response.data;
  }
}
