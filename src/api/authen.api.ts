import { axiosInstance } from "./axiosInstance";

export async function Login(email: string, password: string) {
  const result = await axiosInstance.post(`/auth/signin`, {
    email: email,
    password: password,
  });
  return result;
}

export async function CheckToken(accessToken: string) {
  const result = await axiosInstance.get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result;
}
