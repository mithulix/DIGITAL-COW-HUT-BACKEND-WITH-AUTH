export type IAllDataType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};


export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
