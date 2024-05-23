import { IItemLog } from "@/interface/itemLog.interface";
import { axiosInstance } from "./axiosInstance";

export async function GetAllItemLog() {
  const result = await axiosInstance.get("/itemLog");
  return result;
}

export async function UpdateItemQuantity(values: IItemLog) {
  const result = await axiosInstance.post("/itemlog", values);
  return result;
}
