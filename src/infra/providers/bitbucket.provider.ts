import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateBranchDto } from 'src/shared/dtos/createBranch.dto';
import { MergeDto } from 'src/shared/dtos/merge.dto';
import { PullRequestDto } from 'src/shared/dtos/pullRequest.dto';

@Injectable()
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
    try {
      const url = this.url + `workspaces?page=${page}&pagelen=${pagelen}`;

      const response = await this.request.get(url);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }

  public async getRepositories(page = 1, pagelen = 100) {
    try {
      const url =
        this.url +
        `user/permissions/repositories?page=${page}&pagelen=${pagelen}`;
      const response = await this.request.get(url);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }

  public async createPullRequest(
    workspace: string,
    repositorie: string,
    data: PullRequestDto,
  ) {
    try {
      const url =
        this.url + `/repositories/${workspace}/${repositorie}/pullrequests`;
      const response = await this.request.post(url, data);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }

  public async getBranchsFromRepositorie(
    workspace: string,
    repositorie: string,
  ) {
    try {
      const url =
        this.url + `/repositories/${workspace}/${repositorie}/refs/branches`;

      const response = await this.request.get(url);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }

  public async getBranchRepositorieFromName(
    workspace: string,
    repositorie: string,
    name: string,
  ) {
    try {
      const url =
        this.url +
        `/repositories/${workspace}/${repositorie}/refs/branches/${name}`;

      const response = await this.request.get(url);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  public async deleteBranchRepositorieFromName(
    workspace: string,
    repositorie: string,
    name: string,
  ) {
    try {
      const url =
        this.url +
        `/repositories/${workspace}/${repositorie}/refs/branches/${name}`;

      const response = await this.request.delete(url);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  public async createBranchsFromRepositorie(
    workspace: string,
    repositorie: string,
    body: CreateBranchDto,
  ) {
    try {
      const url =
        this.url + `/repositories/${workspace}/${repositorie}/refs/branches`;

      const response = await this.request.post(url, body);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }

  public async declinePullRequest(
    workspace: string,
    repositorie: string,
    pullRequest: string,
  ) {
    try {
      const url =
        this.url +
        `repositories/${workspace}/${repositorie}/pullrequests/${pullRequest}/decline`;
      const response = await this.request.post(url);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }
  public async mergePullRequest(
    workspace: string,
    repositorie: string,
    pullRequest: string,
  ) {
    try {
      const url =
        this.url +
        `repositories/${workspace}/${repositorie}/pullrequests/${pullRequest}/merge`;
      const response = await this.request.post(url);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }
  public async checkDiffPullRequest(
    workspace: string,
    repositorie: string,
    pullRequest: string,
  ) {
    try {
      const url =
        this.url +
        `repositories/${workspace}/${repositorie}/pullrequests/${pullRequest}/diffstat`;
      const response = await this.request.get(url);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }
}
