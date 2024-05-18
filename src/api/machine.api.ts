import { axiosInstance } from "./axiosInstance";

export async function GetAllMachine() {
  const result = await axiosInstance.get("/machine");
  return result;
}
