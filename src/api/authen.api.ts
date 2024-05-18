import { AuthContext } from "@/context/auth.context";
import { axiosInstance } from "./axiosInstance";
import { useContext } from "react";
import { IEmployee } from "@/interface/employee.interface";

export async function Login(email: string, password: string) {
  const result = await axiosInstance.post(`/auth/signin`, {
    email: email,
    password: password,
  });
  return result;
}

export async function CheckToken(accessToken: string) {
  const auth = useContext(AuthContext);
  try {
    const result = await axiosInstance.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    auth?.setAuthContext({
      ...(result.data.data as IEmployee),
    });
    return result;
  } catch (error) {
    return error;
  }
}
