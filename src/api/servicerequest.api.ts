import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllServiceRequest() {
  const result = await axiosInstance.get("/servicerequest");
  return result;
}

export async function GetServiceRequestByID(id: number) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid Service Request id");
  const result = await axiosInstance.get(`/servicerequest/${id}`);
  return result;
}

export async function CreateServiceRequest(values: ISerivceRequest) {
  const result = await axiosInstance.post(`/servicerequest/`, values);
  return result;
}

export async function UpdateServiceRequest(
  id: number,
  values: ISerivceRequest,
) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid Service Request id");
  const result = await axiosInstance.put(`/servicerequest/${id}`, values);
  return result;
}

export async function DeleteServiceRequest(id: number) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid Service Request id");
  const result = await axiosInstance.delete(`/servicerequest/${id}`);
  return result;
}
