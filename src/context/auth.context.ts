import { IEmployee } from "@/interface/employee.interface";
import { createContext } from "react";

export const initialAuth: IEmployee = {
  employeeID: 0,
  name: "",
  surname: "",
  imageURL: "",
  positionID: 0,
  email: "",
  bonus: 0,
  password: "",
};

interface AuthContextType {
  authContext: IEmployee;
  setAuthContext: (value: IEmployee) => void;
}

export const AuthContext = createContext<AuthContextType | null>({
  authContext: initialAuth,
  setAuthContext: () => {},
});
