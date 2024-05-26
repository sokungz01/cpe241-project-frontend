import { IMaintenanceLog } from "@/interface/maintenancelog.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllMaintenanceLog() {
  const result = await axiosInstance.get("/maintenancelog");
  return result;
}

export async function CreateMaintenanceLog(values: IMaintenanceLog) {
  const result = await axiosInstance.post(`/maintenancelog/`, values);
  return result;
}

export async function CreateMaintenanceLogByMaintainID(maintainID: number) {
  const result = await axiosInstance.get(`/maintenancelog/${maintainID}`);
  return result;
}

export async function UpdateMaintenanceLogStatus(
  id: number,
  values: { statusID: number },
) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid MaintenanceLog id");
  const result = await axiosInstance.put(`/maintenancelog/${id}`, values);
  return result;
}
