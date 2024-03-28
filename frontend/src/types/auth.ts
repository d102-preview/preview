import { IUserInfo } from './model';

export interface IGetEmailDuplicateRes {
  available: boolean;
}

export interface IPostEmailCertificationRes {
  result: string;
}

export interface IPostEmailVerifyRes {
  verify: boolean;
}

export interface IPostEmailVerifyReq {
  email: string;
  authorizationCode: number;
}

export interface IPostJoinReq {
  email: string;
  password: string;
  name: string;
}

export interface IPostJoinRes {
  user: IUserInfo;
}

export interface IPostLoginReq {
  email: string;
  password: string;
}

export interface IPostLoginRes {
  user: IUserInfo;
}
