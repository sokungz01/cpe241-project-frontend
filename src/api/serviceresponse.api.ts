import { IServiceResponse } from "@/interface/serviceresponse.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllServiceresponse() {
  const result = await axiosInstance.get("/serviceresponse");
  return result;
}

export async function GetServiceResponseByServiceID(id: number) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid Service response id");
  const result = await axiosInstance.get(`/serviceresponse/service/${id}`);
  return result;
}

export async function CreateServiceResponse(values: IServiceResponse) {
  const result = await axiosInstance.post(`/serviceresponse/`, values);
  return result;
}

export async function UpdateServiceResponse(
  id: number,
  values: IServiceResponse,
) {
  if (!id || Number(id) === 0)
    throw new Error("Error! Invalid Service response id");
  const result = await axiosInstance.put(`/serviceresponse/${id}`, values);
  return result;
}
