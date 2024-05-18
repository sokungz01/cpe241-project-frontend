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
