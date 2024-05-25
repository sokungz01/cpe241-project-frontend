import { DATENULL } from "./date.interface";
import { IEmployee } from "./employee.interface";
import { ISerivceRequest } from "./servicerequest.interface";

export interface IServiceResponse {
  staffServiceID: number;
  staffID: number;
  user: IEmployee;
  requestedServiceID: number;
  serviceRequest: ISerivceRequest;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: DATENULL | null;
}

export interface IServiceResponseGroup {
  serviceResponse: IServiceResponse[];
}
