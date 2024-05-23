import { IErrorType } from "@/interface/errortype.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllErrorType() {
  const result = await axiosInstance.get("/errortype");
  return result;
}

export async function GetErrorTypeByID(id: number) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid ErrorType id");
  const result = await axiosInstance.get(`/errortype/${id}`);
  return result;
}

export async function CreateErrorType(values: IErrorType) {
  const result = await axiosInstance.post(`/errortype/`, values);
  return result;
}

export async function UpdateErrorType(id: number, values: IErrorType) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid ErrorType id");
  const result = await axiosInstance.put(`/errortype/${id}`, values);
  return result;
}

export async function DeleteErrorType(id: number) {
  if (!id || Number(id) === 0) throw new Error("Error! Invalid ErrorType id");
  const result = await axiosInstance.delete(`/errortype/${id}`);
  return result;
}
