import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export async function Login(email: string, password: string) {
  const result = await axios.post(
    `${baseURL}/auth/signin`,
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
  return result;
}

export async function CheckToken(accessToken: string) {
  const result = await axios.get(`${baseURL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result;
}
