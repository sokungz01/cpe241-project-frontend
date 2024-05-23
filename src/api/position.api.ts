import { IPosition } from "@/interface/position.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllPosition() {
  const result = await axiosInstance.get(`/position/`);
  return result;
}

export async function GetPositionByID(id: number) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid Position id");
  const result = await axiosInstance.get(`/position/${id}`);
  return result;
}

export async function CreatePosition(values: IPosition) {
  const result = await axiosInstance.post(`/position/`, values);
  return result;
}

export async function UpdatePosition(id: number, values: IPosition) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid Position id");
  const result = await axiosInstance.put(`/position/${id}`, values);
  return result;
}
export async function DeletePosition(id: number) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid Position id");
  const result = await axiosInstance.delete(`/position/${id}`);
  return result;
}
