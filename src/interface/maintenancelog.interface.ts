import { IMachine } from "./machine.interface";

export interface IMaintenanceLog {
  maintenanceID: number;
  staffID: number;
  machineID: number;
  machine: IMachine;
  period: number;
  createdDate: Date;
  updateDate: Date;
  statusID: number;
}
