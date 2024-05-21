import { axiosInstance } from "./axiosInstance";

export async function GetAllItemLog() {
  const result = await axiosInstance.get("/itemLog");
  return result;
}
