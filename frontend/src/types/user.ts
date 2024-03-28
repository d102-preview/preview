import { IUserInfo } from './model';

export interface IGetUserRes {
  user: IUserInfo;
}

export interface IPatchUserReq {
  [key: string]: string;
}

export interface IPatchUserRes {
  user: IUserInfo;
}
