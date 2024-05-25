export interface IErrorlog {
  errorID: number;
  errorTypeID: number | string;
  serviceID: number;
  errorDescription: string;
  createdDate: Date;
  updateDate: Date;
}
