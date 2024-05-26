import { axiosInstance } from "./axiosInstance";

export async function GetAllInventoryAnalyze() {
  const result = await axiosInstance.get("/analyze/timeseriesInventory");
  return result;
}

export async function GetAllMachineTypeErrorAnalyze() {
  const result = await axiosInstance.get("/analyze/machinetypeerror");
  return result;
}
export async function GetAllEmployeeEngagement() {
  const result = await axiosInstance.get("/analyze/employeeengage");
  return result;
}
export async function GetAllMaintainCost() {
  const result = await axiosInstance.get("/analyze/maintenancecos");
  return result;
}
