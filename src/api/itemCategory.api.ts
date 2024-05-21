import { axiosInstance } from "./axiosInstance";

export async function GetALlItemCategory() {
  const result = await axiosInstance.get("/itemCategory");
  return result;
}
