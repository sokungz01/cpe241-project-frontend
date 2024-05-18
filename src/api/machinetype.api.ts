import { axiosInstance } from "./axiosInstance";

export async function GetAllMachineType() {
  const result = await axiosInstance.get("/machinetype");
  return result;
}
