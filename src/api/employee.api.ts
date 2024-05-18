import { IEmployee } from "@/interface/employee.interface";
import { axiosInstance } from "./axiosInstance";

export async function CreateEmployee(values: IEmployee) {
  const result = await axiosInstance.post(`/auth/signup`, values);
  return result;
}
