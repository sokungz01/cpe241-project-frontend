import { DATENULL } from "./date.interface";
import { IEmployee } from "./employee.interface";
import { IMaintenanceParts } from "./maintenanceparts.interface";
import { ISerivceRequest } from "./servicerequest.interface";

export interface IServiceResponse {
  values: Promise<IMaintenanceParts[]>;
  staffServiceID: number;
  staffID: number;
  user: IEmployee;
  requestedServiceID: number;
  serviceRequest: ISerivceRequest;
  title: string;
  description: string;
  createdDate: Date;
  updateDate: DATENULL | null | Date;
  maintenanceParts: IMaintenanceParts[];
}

export interface IServiceResponseGroup {
  serviceResponse: IServiceResponse[];
}
