export type IErrorMessage = { path: string | number; message: string };

export type IErrorResponse = {
  status: number;
  message: string;
  errorMessage: IErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
