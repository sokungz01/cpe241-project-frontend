import { IMachineType } from "@/interface/machinetype.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllMachineType() {
  const result = await axiosInstance.get("/machinetype");
  return result;
}

export async function GetMachineTypeByID(id: number) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid machinetype id");
  const result = await axiosInstance.get(`/machinetype/${id}`);
  return result;
}

export async function CreateMachineType(values: IMachineType) {
  const result = await axiosInstance.post(`/machinetype/`, values);
  return result;
}

export async function UpdateMachineType(id: number, values: IMachineType) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid machinetype id");
  const result = await axiosInstance.put(`/machinetype/${id}`, values);
  return result;
}

export async function DeleteMachineType(id: number) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid machinetype id");
  const result = await axiosInstance.delete(`/machinetype/${id}`);
  return result;
}
