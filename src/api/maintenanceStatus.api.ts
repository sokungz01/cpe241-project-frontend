import { axiosInstance } from "./axiosInstance";

export async function GetAllMaintenanceStatus() {
  const result = await axiosInstance.get(`/maintenancestatus/`);
  return result;
}
