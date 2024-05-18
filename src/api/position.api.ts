import { axiosInstance } from "./axiosInstance";

export async function GetAllPosition() {
  const result = await axiosInstance.get(`/position`);
  return result;
}
