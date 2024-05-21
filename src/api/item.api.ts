import { axiosInstance } from "./axiosInstance";

export async function GetALlItem() {
  const result = await axiosInstance.get("/item");
  return result;
}
