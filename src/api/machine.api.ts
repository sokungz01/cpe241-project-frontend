import { IMachine } from "@/interface/machine.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllMachine() {
  const result = await axiosInstance.get("/machine");
  return result;
}

export async function CreateMachine(values: IMachine) {
  const result = await axiosInstance.post("/machine", values);
  return result;
}

export async function GetMachineByID(machineID: number) {
  if (!machineID || Number(machineID) === 0)
    throw new Error("Error! Invalid machine id");
  const result = await axiosInstance.get(`/machine/${machineID}`);
  return result;
}

export async function UpdateMachineByID(machineID: number, values: IMachine) {
  if (!machineID || Number(machineID) === 0)
    throw new Error("Error! Invalid machine id");
  const result = await axiosInstance.put(`/machine/${machineID}`, values);
  return result;
}

export async function DeleteMachine(machineID: number) {
  if (!machineID || Number(machineID) === 0)
    throw new Error("Error! Invalid machine id");
  const result = await axiosInstance.delete(`/machine/${machineID}`);
  return result;
}
