export type ResponseModel<T> = {
  result: T;
  message: string;
  isSucceed: boolean;
  statusCode: number;
};
