import { axiosInstance } from "./axiosInstance";

export async function GetAllItem() {
  const result = await axiosInstance.get("/item");
  return result;
}
