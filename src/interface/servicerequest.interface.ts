import { DATENULL } from "./date.interface";
import { IEmployee } from "./employee.interface";
import { IErrorlog } from "./errorlog.interface";
import { IMachine } from "./machine.interface";

export interface ISerivceRequest {
  serviceID: number;
  employeeID: number;
  user: IEmployee;
  machineID: number;
  machine: IMachine;
  description: string;
  errorLog: IErrorlog[];
  createdDate: Date;
  updateDate: DATENULL | null;
  statusID: number;
}
