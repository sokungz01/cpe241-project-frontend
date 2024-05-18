import { axiosInstance } from "./axiosInstance";

export async function getPosition() {
  const result = await axiosInstance.get(`/position`);
  return result;
}
