import { IEmployee } from "@/interface/employee.interface";
import { axiosInstance } from "./axiosInstance";

export async function CreateEmployee(values: IEmployee) {
  const result = await axiosInstance.post(`/auth/signup`, values);
  return result;
}

export async function GetAllEmployee() {
  const result = await axiosInstance.get("/user/all");
  return result;
}

export async function GetEmployeeByID(userID: number) {
  if (!userID) throw new Error("Error! invalid userID");
  const result = await axiosInstance.get(`/user/${userID}`);
  return result;
}

export async function UpdateEmployeeByID(userID: number, values: IEmployee) {
  if (!userID) throw new Error("Error! invalid userID");
  const result = await axiosInstance.put(`/auth/update/${userID}`, values);
  return result;
}

export async function DeleteEmployee(userID: number) {
  if (!userID) throw new Error("Error! invalid userID");
  const result = await axiosInstance.delete(`/user/delete/${userID}`);
  return result;
}
