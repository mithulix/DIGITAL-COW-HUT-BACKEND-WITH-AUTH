export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  logInUserRole?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
