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
