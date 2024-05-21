import { AuthContext } from "@/context/auth.context";
import { IEmployee } from "@/interface/employee.interface";
import { useContext } from "react";
import { axiosInstance } from "./axiosInstance";

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
    return {
      status: 200,
      message: "Authenticate∏",
      data: result,
    };
  } catch (error) {
    return {
      status: 401,
      message: error,
    };
  }
}
